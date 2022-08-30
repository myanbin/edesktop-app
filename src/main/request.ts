import { ipcMain, net } from 'electron';

const post = (url: string, data: unknown): Promise<unknown> => {
  return new Promise((resolve) => {
    const req = net.request({ method: 'post', url });
    req.on('response', (res) => {
      res.on('data', (chunk) => {
        resolve(JSON.parse(chunk.toString()));
      });
    });
    req.setHeader('Content-Type', 'application/json');
    req.setHeader('Authorization', 'Bearer 12345678');
    req.end(JSON.stringify(data), 'utf-8');
  });
};

// Backend HTTP API
const baseUrl = 'https://aicheck.xinhua-news.com';

ipcMain.handle('request:login', (_e, data) => {
  return post(`${baseUrl}/auth/login`, data);
});
