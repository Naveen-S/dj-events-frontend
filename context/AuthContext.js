import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  const register = async (user) => {
    console.log(user);
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      setError(data.message);
    }
    console.log('data ==> ', data);
  };

  const login = async ({ email: identifier, password }) => {
    console.log('Login called', { identifier, password });
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      body: JSON.stringify({ identifier: identifier, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      setError(data.message);
    }
    console.log('data ==> ', data);
  };

  const logout = async () => {
    console.log('Logout');
    const res = await fetch(`${NEXT_URL}/api/logout`, { method: 'POST' });
    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  const checkUserLoggedIn = async (user) => {
    console.log('check');
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
    console.log('data  :: ', data);
    console.log('res >>> ', res);
    if (res.ok) {
      setUser(data);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, checkUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
