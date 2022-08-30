import { ipcMain } from 'electron';

ipcMain.handle('request:login', (e, data) => {
  // eslint-disable-next-line no-console
  console.log('login', data);
  return new Promise((resolve) => {
    resolve('login success');
  });
});
