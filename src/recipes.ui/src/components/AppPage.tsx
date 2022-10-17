import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { ReactNode } from 'react';

interface Props {
  title: string | undefined,
  isLoading?: boolean,
  children?: ReactNode,
  toolbarButtons?: ReactNode,
}

interface AppPageProps extends Partial<Props> {
  title: string | undefined,
}

function AppPage({
  title, isLoading = false, children, toolbarButtons,
}: AppPageProps) {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          {toolbarButtons}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar className="ion-wrap ion-justify-content-between">
            <IonTitle size="large">
              <div className="ion-text-wrap">
                {title}
              </div>
            </IonTitle>
            {toolbarButtons}
          </IonToolbar>
        </IonHeader>
        {
                        isLoading ? <IonSpinner /> : children
                    }
      </IonContent>
    </IonPage>
  );
}

export default AppPage;
