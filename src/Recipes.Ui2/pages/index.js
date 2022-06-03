import dynamic from 'next/dynamic';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

const App = dynamic(() => import('../components/AppShell'), {
  ssr: false,
});

serviceWorkerRegistration.register();

export default function Index() {
  return <App />;
}
