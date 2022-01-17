import { signInWithEmailAndPassword } from 'firebase/auth';
import { authorization } from '../firebase/config';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const { dispatch } = useAuth();

  const login = async (email, password) => {
    setError(null);
    setPending(true);
    try {
      const user = await signInWithEmailAndPassword(
        authorization,
        email,
        password,
      );
      console.log(user);
      dispatch({ type: 'LOGIN', payload: user.user });
      if (!cancelled) {
        setError(false);
        setPending(false);
      }
    } catch (err) {
      if (!cancelled) {
        setError(err.message);

        setPending(false);
      }
    }
  };
  useEffect(() => {
    return setCancelled(true);
  }, []);
  return { error, pending, login };
};
