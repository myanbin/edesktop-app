import { FC } from 'react';
import GotoButton from '../components/GotoButton';

const Settings: FC = () => {
  return (
    <main>
      <h2 className="pane-header">Settings</h2>
      <GotoButton to="/" />
    </main>
  );
};

export default Settings;
