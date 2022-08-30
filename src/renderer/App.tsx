import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Check from './views/Check';

const App: FC = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="" element={<Check />} />
      </Routes>
    </>
  );
};

export default App;
