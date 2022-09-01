import { ipcMain, net } from 'electron';

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
        resolve({
          code: data.code === 0 ? 200 : 403,
          data: data.result,
        });
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
        resolve({
          code: 200,
          data: data.data[0][body.key],
        });
      });
    });
    req.setHeader('Content-Type', 'application/json');
    req.setHeader('Authorization', 'Bearer dG6zsIRNuCMlA0Hzsawm2eAuA');
    req.end(
      JSON.stringify({
        checkContentList: [body],
      })
    );
  });
});
