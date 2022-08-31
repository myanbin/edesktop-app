import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import GotoButton from '../components/GotoButton';
import { appToaster } from '../utils';

const Login: FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const res = await window.electron.httpRequest('login', {
      username,
      password,
    });
    // eslint-disable-next-line no-console
    console.log(res);
    appToaster.show({
      intent: Intent.PRIMARY,
      icon: 'notifications',
      message: '没错，你就是马艳彬本人~',
    });
    navigate('/');
  };

  return (
    <main className="login-page">
      <h2 className="pane-header">Login</h2>
      <section className="login">
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
        <div className="space-content">
          <Button
            intent={Intent.PRIMARY}
            icon="log-in"
            text="登录帐号"
            onClick={() => handleSubmit()}
          />
          <Button minimal text="忘记密码" />
        </div>
      </section>
      <footer>
        <GotoButton to="/" />
      </footer>
    </main>
  );
};

export default Login;
