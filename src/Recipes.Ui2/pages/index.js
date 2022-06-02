import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/AppShell'), {
  ssr: false,
});

serviceWorkerRegistration.register();

export default function Index() {
  return <App />;
}
