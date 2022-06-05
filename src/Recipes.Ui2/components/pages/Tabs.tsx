import {Redirect, Route} from 'react-router-dom';
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {add, readerOutline, search} from 'ionicons/icons';
import Recipes from "./Recipes";
import Add from './Add';
import View from "./View";
import routes from "../../models/constants/routes";
import Edit from "./Edit";

const Tabs = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path={routes.home} component={Recipes} exact={true}/>
                <Route path={routes.viewDef} component={View} exact={true}/>
                {/*<Route path="/tabs/lists" component={Lists} exact={true}/>*/}
                <Route path={routes.add} component={Add} exact={true}/>
                <Route path={routes.editDef} component={Edit} exact={true}/>
                <Route path="/tabs" render={() => <Redirect to={routes.home}/>} exact={true}/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="recipes" href={routes.home}>
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
    );
};

export default Tabs;
