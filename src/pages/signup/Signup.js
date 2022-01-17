import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { useTheme } from '../../hooks/useTheme';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setName] = useState('');
  const { mode } = useTheme();
  const { signup, pending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <div>
      <form className={`signup ${mode}`} onSubmit={handleSubmit}>
        <h3>signup</h3>
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
        <label>
          <span>username:</span>
          <input
            type='text'
            required
            value={displayName}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {!pending && <button>Signup</button>}
        {pending && <button disabled>Signing up</button>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
