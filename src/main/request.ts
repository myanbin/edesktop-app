import { ipcMain, net } from 'electron';
import store from './store';

export interface Response<T = unknown> {
  code: number;
  message?: string;
  data: T;
}

type LoginRequest = {
  username: string;
  password: string;
};

type CheckRequest = {
  key: string;
  value: string;
}[];

// Backend HTTP API
const baseUrl = 'http://172.21.234.48/jiaozhen_api';

ipcMain.handle('request:login', (_e, body: LoginRequest): Promise<Response> => {
  return new Promise((resolve) => {
    const req = net.request({
      method: 'post',
      url: `${baseUrl}/auth/clientLogin`,
    });
    req.on('response', (res) => {
      res.on('data', (chunk) => {
        const data = JSON.parse(chunk.toString());
        if (data.code !== 0) {
          resolve({
            code: 403,
            data: null,
          });
        } else {
          store.set('account.token', data.result.token);
          resolve({
            code: 200,
            data: {
              username: data.result.username,
              nickname: data.result.nickName,
              organization: data.result.companyName,
              email: data.result.email,
              phone: data.result.phone,
              token: data.result.token,
            },
          });
        }
      });
    });
    req.setHeader('Content-Type', 'application/json');
    req.end(JSON.stringify(body));
  });
});

ipcMain.handle('request:check', (_e, body: CheckRequest): Promise<Response> => {
  return new Promise((resolve) => {
    const req = net.request({
      method: 'post',
      url: `${baseUrl}/api/aicheck/text`,
    });
    req.on('response', (res) => {
      if (res.statusCode !== 200) {
        resolve({
          code: res.statusCode,
          data: null,
        });
      }
      res.on('data', (chunk) => {
        const data = JSON.parse(chunk.toString());
        const errors = data.data.map((block: any) => {
          const key = Object.keys(block).join('');
          return block[key].map((error: any) => {
            return {
              key,
              start: error.errPos,
              end: error.errPos + error.errWord.length,
              errText: error.errWord,
              corText: error.corWord[0] || '',
              level: +error.errLevel,
              message: error.errMsg,
            };
          });
        });
        resolve({
          code: 200,
          data: errors.flat(),
        });
      });
    });
    req.setHeader('Content-Type', 'application/json');
    req.setHeader('Authorization', `Bearer ${store.get('account.token')}`);
    req.end(
      JSON.stringify({
        checkContentList: body,
      })
    );
  });
});
