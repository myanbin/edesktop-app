import { FC, useState } from 'react';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import GotoButton from '../components/GotoButton';

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const res = await window.electron.httpRequest('login', {
      username,
      password,
    });
    // eslint-disable-next-line no-console
    console.log(res);
  };

  return (
    <main>
      <h2 className="pane-header">Login</h2>
      <FormGroup label="Username">
        <InputGroup
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormGroup>
      <FormGroup label="Password">
        <InputGroup
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Button
          intent={Intent.PRIMARY}
          text="登录帐号"
          onClick={() => handleSubmit()}
        />
      </FormGroup>
      <GotoButton to="/" />
    </main>
  );
};

export default Login;
