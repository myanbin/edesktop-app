import { createRoot } from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './App.css';
import Login from './views/Login';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <MemoryRouter>
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  </MemoryRouter>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
