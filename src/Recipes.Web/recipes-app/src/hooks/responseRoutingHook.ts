import { useIonRouter } from '@ionic/react';
import { Res, useFetch } from 'use-http';

function responseRoutingHook(route: string) {
  const { push } = useIonRouter();
  const { cache } = useFetch();

  function ifResponseOkNavigate(response: Res<any>) {
    if (response.ok) {
      cache.clear();
      push(route);
    }
  }

  return { ifResponseOkNavigate };
}

export default responseRoutingHook;
