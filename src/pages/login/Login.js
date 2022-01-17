import React, { useState } from 'react';
import './Login.css';
import { useTheme } from '../../hooks/useTheme';
import { useLogin } from '../../hooks/useLogin';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mode } = useTheme();
  const { login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <form className={`login ${mode}`} onSubmit={handleSubmit}>
      <h3>login</h3>
      <label>
        <span>email:</span>
        <input
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        <span>password:</span>
        <input
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button>Login</button>
    </form>
  );
};

export default Login;
