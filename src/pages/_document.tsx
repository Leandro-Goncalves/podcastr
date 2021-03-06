import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocuments extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet"/>
          <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
          <link rel='manifest' href='/manifest.json' />
          <meta name='theme-color' content='#317EFB' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}