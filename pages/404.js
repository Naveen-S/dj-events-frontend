import React from 'react';
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';
import Layout from '@/components/Layout';
import styles from '@/styles/404.module.css';
const NotFound = () => {
  return (
    <Layout title='Page not found'>
      <div className={styles.error}>
        <h1 className='flex'>
          <FaExclamationTriangle className='mx-2' />
          404
        </h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href='/'>
          <a className='link'>Go Back Home</a>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
