import { ThemeProvider } from '@primer/react';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider colorMode="auto">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
