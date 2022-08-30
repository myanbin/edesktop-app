import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Check from './views/Check';
import Settings from './views/Settings';

const App: FC = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="" element={<Check />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default App;
