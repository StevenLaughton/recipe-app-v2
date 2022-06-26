import {IonApp, IonRouterOutlet, useIonToast} from '@ionic/react';
import {StatusBar, Style} from '@capacitor/status-bar';
import {IonReactRouter} from '@ionic/react-router';
import {Redirect, Route} from 'react-router-dom';
import Tabs from './pages/Tabs';
import {Provider} from 'use-http';

window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
    try {
        await StatusBar.setStyle({
            style: status.matches ? Style.Dark : Style.Light,
        });
    } catch {
    }
});

const AppShell = () => {
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
                <IonRouterOutlet id="main">
                    <Provider url={process.env.NEXT_PUBLIC_API_URL} options={globalOptions}>
                        <Route path="/tabs" render={() => <Tabs/>}/>
                        <Route exact path="/" render={() => <Redirect to="/tabs"/>}/>
                    </Provider>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default AppShell;
