import Head from 'next/head';
import Script from 'next/script';
import 'tailwindcss/tailwind.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '../styles/global.css';
import '../styles/variables.css';
import { setupIonicReact } from "@ionic/react";

setupIonicReact()

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="color-scheme" content="light dark"/>
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="format-detection" content="telephone=no"/>
        <meta name="msapplication-tap-highlight" content="no"/>

        <link rel="manifest" crossOrigin="use-credentials" href="%PUBLIC_URL%/manifest.json"/>

        <link rel="shortcut icon" type="image/svg" href="%PUBLIC_URL%/assets/icon/bowl.svg"/>
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/assets/icon/bowl.png"/>
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#008f00"/>
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1e2023"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-title" content="Recipes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      </Head>
      <Component {...pageProps} />
      <Script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></Script>
    </>
  );
}

export default MyApp;
