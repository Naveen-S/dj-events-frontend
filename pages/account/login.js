import React, { useEffect, useState, useContext } from 'react';
import { FaUser } from 'react-icons/fa';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/AuthForm.module.css';
import AuthContext from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, user } = useContext(AuthContext);

  useEffect(() => {
    error && toast.error(error);
    user && toast(`${user.username} successfully logged In`);
  });
  const handleInput = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
      return;
    }
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='Email Id'
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={handleInput}
            />
          </div>
          <div>
            <input type='submit' value='Login' className='btn' />
          </div>
        </form>
        <p>
          {`Don't have an account? `}
          <Link href='/account/register'>
            <span className='link'>Register</span>
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
