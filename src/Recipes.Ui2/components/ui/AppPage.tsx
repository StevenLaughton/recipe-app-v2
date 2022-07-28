import {IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar,} from '@ionic/react';
import React, {ReactNode} from 'react';

interface Props{
  title: string | undefined,
  isLoading?: boolean,
  loadingMessage?: string,
  children?: ReactNode,
  toolbarButtons?: ReactNode,
}
interface AppPageProps extends Partial<Props>{
  title: string | undefined,
}

function AppPage({
  title, isLoading = false, loadingMessage = '', children, toolbarButtons,
}: AppPageProps) {
    console.log(isLoading)
  return (
      <IonPage>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonTitle>{ title }</IonTitle>
            {/*{toolbarButtons}*/}
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" fullscreen={true} >
          <IonHeader collapse="condense" >
            <IonToolbar className="ion-wrap ion-justify-content-between">
              <IonTitle size="large" >{title}</IonTitle>
              {toolbarButtons}
            </IonToolbar>
          </IonHeader>
          {/*<IonLoading isOpen={isLoading} message={loadingMessage} />*/}
          { children }
        </IonContent>
      </IonPage>
  );
}

export default AppPage;
