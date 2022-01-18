import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useReducer } from 'react';
import { authorization } from '../firebase/config';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, ready: true };

    case 'LOGOUT':
      return { user: null, ready: true };
    case 'READY':
      return { ...state, ready: true, user: action.payload };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    ready: null,
  });

  console.log(state);

  useEffect(() => {
    const unsub = onAuthStateChanged(authorization, (user) => {
      dispatch({ type: 'READY', payload: user });
    });

    unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
