// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Google Fonts Link එක මෙතනට දාන්න */}
          {/* ඔයාට අවශ්‍ය Fonts ටික මෙතන preload කරන්න පුළුවන් */}
          {/* Note: PostInputForm එකේ add කරපු fonts ඔක්කොම load කරන්න පුළුවන් */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* All fonts from PostInputForm.tsx combined in one request */}
          <link
            href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;600&family=Lato:wght@400;700&family=Montserrat:wght@400;500;600&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Roboto:wght@400;500;700&family=Source+Sans+Pro:wght@400;600&display=swap"
            rel="stylesheet"
          />
          
          {/* මේකෙන් PostInputForm එකේ තියෙන Google Fonts ටික Load වෙනවා */}
          {/* html-to-image එක generate කරනකොට browser එකේ මේ fonts available වෙනවා */}
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