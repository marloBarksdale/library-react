import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { authorization } from '../firebase/config';
import { useAuth } from './useAuth';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(null);
  const [canceled, setCanceled] = useState(false);
  const { dispatch } = useAuth();

  const signup = async (email, password, displayName) => {
    setPending(true);
    setError(null);
    try {
      const user = await createUserWithEmailAndPassword(
        authorization,
        email,
        password,
      );

      await updateProfile(user.user, { displayName });
      dispatch({ type: 'LOGIN', payload: user.user });
      if (!canceled) {
        setError(null);
        setPending(false);
      }
    } catch (error) {
      if (!canceled) {
        setError(error.message);
        setPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setCanceled(true);
  }, []);

  return { signup, error, pending };
};
