import { useCallback, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/search.module.css';

const Search = () => {
  const [keyword, setKeyword] = useState('');

  const onChange = useCallback((e) => {
    const value = e.target.value;
    setKeyword(value);
  }, []);

  /** @type {import('react').FormEventHandler<HTMLFormElement>} */
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    location.href = keyword;
  }, [keyword]);

  return (
    <section>
      <Head>
        <title>Search</title>
      </Head>
      <form className={styles.form} action="" onSubmit={onSubmit}>
        <label className={styles['input-wrapper']}>
          <input className={styles.input} type="url" name="keyword" placeholder="请输入" onChange={onChange} />
        </label>
      </form>
    </section>
  );
}

export default Search;
