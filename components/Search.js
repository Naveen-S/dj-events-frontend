import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Search.module.css';

const Search = () => {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const handleTermChange = (e) => {
    console.log('e ', e.target.value);
    setTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={term}
          onChange={(e) => {
            handleTermChange(e);
          }}
          placeholder='Search Events'
        />
      </form>
    </div>
  );
};

export default Search;
