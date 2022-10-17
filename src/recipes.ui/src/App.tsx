import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet, IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IonReactRouter } from '@ionic/react-router';
import { add, readerOutline, search } from 'ionicons/icons';
import React, { lazy, Suspense } from 'react';
import routes from './models/constants/routes';

const Recipes = lazy(() => import('./pages/Recipes'));
const View = lazy(() => import('./pages/View'));
const Add = lazy(() => import('./pages/Add'));
const Edit = lazy(() => import('./pages/Edit'));

const queryClient = new QueryClient();

function App() {
  setupIonicReact();

  return (
    <IonApp>
      <QueryClientProvider client={queryClient}>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Suspense fallback={<IonSpinner />}>
                <Route path={routes.home} component={Recipes} exact />
                <Route path={routes.viewDef} component={View} exact />
                <Route path={routes.add} component={Add} exact />
                <Route path={routes.editDef} component={Edit} exact />
                <Route path="/" exact>
                  <Redirect to={routes.home} />
                </Route>
                {' '}

              </Suspense>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href={routes.home}>
                <IonIcon icon={readerOutline} />
                <IonLabel>Recipes</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tabs/lists">
                <IonIcon icon={search} />
                <IonLabel>Search</IonLabel>
              </IonTabButton>
              <IonTabButton tab="add" href={routes.add}>
                <IonIcon icon={add} />
                <IonLabel>Add</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </QueryClientProvider>
    </IonApp>
  );
}

export default App;
