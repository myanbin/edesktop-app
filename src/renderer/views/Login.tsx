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
    const result = await window.electron.httpRequest('login', {
      username,
      password,
    });
    console.log(result);
    if (result.code === 200) {
      appToaster.show({
        intent: Intent.PRIMARY,
        icon: 'emoji',
        message: '欢迎使用较真客户端',
      });
      navigate('/');
    } else {
      appToaster.show({
        intent: Intent.DANGER,
        icon: 'warning-sign',
        message: '登录失败，请检查您的用户名和密码',
      });
    }
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
