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
  return (
      <IonPage>
        <IonHeader collapse="fade">
          <IonToolbar>
            <IonTitle>{ title }</IonTitle>
            {toolbarButtons}
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" fullscreen>
          <IonHeader collapse="condense" >
            <IonToolbar className="ion-wrap ion-justify-content-between">
              <IonTitle size="large" className="ion-text-wrap">{title}</IonTitle>
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
