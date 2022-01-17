import { signInWithEmailAndPassword } from 'firebase/auth';
import { authorization } from '../firebase/config';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const login = async (email, password) => {
    setError(null);
    setPending(true);
    try {
      const user = await signInWithEmailAndPassword(
        authorization,
        email,
        password,
      );

      setError(false);
      setPending(false);
    } catch (err) {
      setError(err.message);
      setPending(false);
    }
  };

  return { error, pending, login };
};
