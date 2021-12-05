import { useCallback } from 'react';
import Head from 'next/head';
import GitHubIcon from '../assets/github.svg';
import styles from '../styles/Home.module.css';
export default function Home() {
  const onGitHubLogin = useCallback(() => {
    const searchParams = new URLSearchParams();
    searchParams.append('client_id', process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID);
    searchParams.append('scope', 'repo admin:repo_hook read:user');
    searchParams.append('state', 'imark');
    const { origin } = location;
    searchParams.append('redirect_uri', `${origin}/api/authorize?redirect=${encodeURIComponent(location.href)}`);
    location.href = `https://github.com/login/oauth/authorize?${searchParams.toString()}`;
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="/search" className={styles.card}>
            <h3>Browser &rarr;</h3>
            <p>Search and access the input url.</p>
          </a>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
        <button onClick={onGitHubLogin}>
          <GitHubIcon />GitHub
        </button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
