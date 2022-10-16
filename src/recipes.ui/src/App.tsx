import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {Redirect, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {IonReactRouter} from '@ionic/react-router';
import routes from "./models/constants/routes";
import Recipes from "./pages/Recipes";
import View from "./pages/View";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import {add, readerOutline, search} from "ionicons/icons";

const queryClient = new QueryClient()

function App() {
    setupIonicReact()

    return (
            <IonApp>
                <QueryClientProvider client={queryClient}>
                    <IonReactRouter>
                        <IonTabs>
                            <IonRouterOutlet>
                                <Route path={routes.home} component={Recipes} exact={true}/>
                                <Route path={routes.viewDef} component={View} exact={true}/>
                                <Route path={routes.add} component={Add} exact={true}/>
                                <Route path={routes.editDef} component={Edit} exact={true}/>
                                <Route path="/" exact={true}>
                                    <Redirect to={routes.home}/>
                                </Route>
                            </IonRouterOutlet>
                            <IonTabBar slot="bottom">
                                <IonTabButton tab="home" href={routes.home}>
                                    <IonIcon icon={readerOutline}/>
                                    <IonLabel>Recipes</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="tab2" href="/tabs/lists">
                                    <IonIcon icon={search}/>
                                    <IonLabel>Search</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="add" href={routes.add}>
                                    <IonIcon icon={add}/>
                                    <IonLabel>Add</IonLabel>
                                </IonTabButton>
                            </IonTabBar>
                        </IonTabs>
                    </IonReactRouter>
                </QueryClientProvider>
            </IonApp>
    )
}

export default App
