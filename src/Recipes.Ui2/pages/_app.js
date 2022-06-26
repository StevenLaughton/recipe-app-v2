import Head from 'next/head';
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
        <title>recipes</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <meta name='application-name' content='recipe-app' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='PWA App' />
        <meta name='description' content='Best PWA App in the world' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#2B5797' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#0f172a' />

        <link rel='apple-touch-icon' sizes='180x180' href='/assets/icon/bowl.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/static/icons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/static/icons/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/assets/icons/bowl.svg' color='#5bbad5' />
        <link rel='shortcut icon' href='/assets/icon/bowl.svg' />

      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
