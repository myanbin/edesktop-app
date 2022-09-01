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
};

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
          const result = {
            username: data.result.username,
            nickname: data.result.nickName,
            organization: data.result.companyName,
            email: data.result.email,
            phone: data.result.phone,
            token: data.result.token,
          };
          resolve({
            code: 200,
            data: result,
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
        const result = data.data[0][body.key].map((item: any) => {
          return {
            errCode: +item.errLevel,
            errPosition: item.errPos,
            errText: item.errWord,
            corText: item.corWord[0] || '',
            errMessage: item.errMsg,
          };
        });
        resolve({
          code: 200,
          data: result,
        });
      });
    });
    req.setHeader('Content-Type', 'application/json');
    req.setHeader('Authorization', `Bearer ${store.get('account.token')}`);
    req.end(
      JSON.stringify({
        checkContentList: [body],
      })
    );
  });
});
