import React, { useEffect, useState, useContext } from 'react';
import { FaUser } from 'react-icons/fa';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/AuthForm.module.css';
import AuthContext from '@/context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register, error } = useContext(AuthContext);

  useEffect(() => {
    error && toast.error(error);
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
    if (password !== confirmPassword) {
      toast.error('Password do not match!');
      return;
    }
    console.log({ username, password, email });
    register({ username, password, email });
  };

  return (
    <Layout title='User Registration'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              placeholder='Username'
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
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
            <label htmlFor='cpassword'>Confirm Password</label>
            <input
              type='password'
              id='cpassword'
              name='cpassword'
              value={confirmPassword}
              placeholder='Confirm Password'
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <input type='submit' value='Register' className='btn' />
          </div>
        </form>
        <p>
          {`Have an account? `}
          <Link href='/account/login'>
            <span className='link'>Login</span>
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
