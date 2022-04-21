import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact, useIonToast,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { readerOutline, search, add } from 'ionicons/icons';
import React from 'react';
import { Provider } from 'use-http';
import MyRecipes from './pages/MyRecipes';
import Search from './pages/Search';
import Add from './pages/Add';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import routes from './models/constants/routes';
import View from './pages/View';
import Edit from './pages/Edit';

setupIonicReact();

function App() {
  const [present, dismiss] = useIonToast();

  const globalOptions = {
    interceptors: {
      request: ({ options }: any) => options,
      response: async ({ response }: any) => {
        if (response.status === 400 && response.data.errors) {
          await present({
            buttons: [{ text: 'hide', handler: () => dismiss() }],
            message: (response.data.errors as string[]).join('\n'),
            duration: 10000,
          });
        }
        return response;
      },
    },
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Provider url={process.env.REACT_APP_PUBLIC_URL} options={globalOptions}>
              <Route exact path={routes.home}>
                <MyRecipes />
              </Route>
              <Route exact path={routes.search}>
                <Search />
              </Route>
              <Route path={routes.add}>
                <Add />
              </Route>
              <Route path={`${routes.view}/:recipeId`}>
                <View />
              </Route>
              <Route path={`${routes.edit}/:recipeId`}>
                <Edit />
              </Route>
              <Route exact path="/">
                <Redirect to={routes.home} />
              </Route>
            </Provider>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="my-recipes" href={routes.home}>
              <IonIcon icon={readerOutline} />
              <IonLabel>My Recipes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="search" href={routes.search}>
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
    </IonApp>
  );
}

export default App;
