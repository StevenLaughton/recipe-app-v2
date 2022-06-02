import {Redirect, Route} from 'react-router-dom';
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {cog, flash, list} from 'ionicons/icons';
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
                <IonTabButton tab="tab1" href={routes.home}>
                    <IonIcon icon={flash}/>
                    <IonLabel>Recipes</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tabs/lists">
                    <IonIcon icon={list}/>
                    <IonLabel>Lists</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href={routes.add}>
                    <IonIcon icon={cog}/>
                    <IonLabel>Add</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default Tabs;
