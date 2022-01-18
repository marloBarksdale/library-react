import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { authorization } from '../firebase/config';
import { useAuth } from './useAuth';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const [canceled, setCanceled] = useState(false);
  const { dispatch } = useAuth();
  const logout = async () => {
    setError(null);
    setPending(true);
    try {
      await signOut(authorization);
      dispatch({ type: 'LOGOUT' });
      if (!canceled) {
        setPending(false);
        setError(null);
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

  return { logout, error, pending };
};
