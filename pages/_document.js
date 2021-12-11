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
          <meta name="description" content="iMark" />
          <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBmaWxsPSIjNDU1QTY0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZD0iTTMgMTFoMTh2MUgzem0xNC42Mi0xbC0yLjI5LTYuMWMtLjE5LS41LS43NC0uNzctMS4yNS0uNkwxMiA0bC0yLjA5LS43Yy0uNTEtLjE3LTEuMDYuMS0xLjI1LjZMNi4zOCAxMGgxMS4yNHptLTEuMTIgM2MtMS42NiAwLTMuMDQgMS4xNi0zLjQgMi43MS0uODQtLjM2LTEuNjItLjI2LTIuMi0uMDFBMy41MDMgMy41MDMgMCAwIDAgNy41IDEzQzUuNTcgMTMgNCAxNC41NyA0IDE2LjVTNS41NyAyMCA3LjUgMjBjMS44NCAwIDMuMzMtMS40MiAzLjQ3LTMuMjIuMy0uMjEgMS4wOS0uNiAyLjA2LjAyLjE2IDEuNzkgMS42NCAzLjIgMy40NyAzLjIgMS45MyAwIDMuNS0xLjU3IDMuNS0zLjVTMTguNDMgMTMgMTYuNSAxM3ptLTkgNmEyLjUgMi41IDAgMCAxIDAtNSAyLjUgMi41IDAgMCAxIDAgNXptOSAwYTIuNSAyLjUgMCAwIDEgMC01IDIuNSAyLjUgMCAwIDEgMCA1eiIvPjwvc3ZnPg==" />
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
