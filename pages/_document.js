import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="zh-CN" data-color-mode="auto" data-light-theme="light" data-dark-theme="dark">
        <Head>
          <meta name="application-name" content="iMark" />
          <meta name="description" content="There is no description for iMark" />
          <meta name='apple-mobile-web-app-title' content="iMark Web" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel='apple-touch-icon' sizes='144x144' href='/icons/apple-touch-icon-144x144.png' />
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <script data-ad-client="ca-pub-5081404689679582" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
