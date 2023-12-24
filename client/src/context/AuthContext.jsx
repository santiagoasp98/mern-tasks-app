/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';

import Cookies from 'js-cookie';

import { 
  loginRequest, 
  registerRequest,
  logoutRequest,
  verifyTokenRequest 
} from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signUp = async (user) => {
    const res = await registerRequest(user);
    setUser(res.data);
    setIsAuthenticated(true);
  }

  const signIn = async (user) => {
    const res = await loginRequest(user);
    setUser(res.data);
    setIsAuthenticated(true);
  }

  const signOut = async () => {
    await logoutRequest();
    setUser(null);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    const verify = async () => {
      const cookies = Cookies.get();
      if (cookies.token) {
        try {
          const res = await verifyTokenRequest(cookies.token)
          if (!res.data) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
            return;
          }
          
          setIsAuthenticated(true);
          setUser(res.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
    }
    verify();
  }, []);

  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      signOut,
      user,
      isAuthenticated,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
};
