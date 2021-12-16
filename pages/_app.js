import { ThemeProvider } from '@primer/react';
import { SessionProvider } from 'next-auth/react';
import { useToken } from '../hooks';
import '../styles/globals.scss';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useToken();

  return (
    <SessionProvider session={session}>
      <ThemeProvider colorMode="auto">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
