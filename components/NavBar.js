import { useCallback } from 'react';
import Link from 'next/link';

const NavBar = () => {
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
    <>
      <header className="header">
        <nav className="nav">
          <Link href="/">
            <a className="logo">
              <h1>iMark</h1>
            </a>
          </Link>
          <menu className="overflow-x-auto menu">
            <li>
              <Link href="/apis"><a className="menu-item">API</a></Link>
            </li>
            <li>
              <Link href="/movies"><a className="menu-item">Movies</a></Link>
            </li>
            <li>
              <Link href="/posts"><a className="menu-item">Posts</a></Link>
            </li>
          </menu>
          <div className="user">
            <button className="whitespace-nowrap sign-in" onClick={onGitHubLogin}>Sign in</button>
          </div>
        </nav>
      </header>
      <style jsx>{`
        .header {
          background-color: rgba(246, 221, 102, 1);
          padding: 14px 16px;
        }
        @media (prefers-color-scheme: dark) {
          .header {
            background-color: #1D1D1F;
          }
        }
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          margin-right: 30px;
          font-size: 1.5rem;
          font-weight: bold;
          font-style: italic;
        }
        .menu {
          flex: auto;
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 16px;
          font-weight: 500;
        }
        .menu-item {
          font-size: 0.9rem;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .menu-item:hover {
          background-color: rgba(234, 76, 137, 0.1);
        }
        .sign-in {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 4px;
          background-color: #000;
          color: #fff;
          font-size: 14px;
        }
        .sign-in:focus {
          outline: none;
          box-shadow: 0 0 0 4px rgba(234, 76, 137, 0.1)
        }
      `}</style>
    </>
  );
};

export default NavBar;
