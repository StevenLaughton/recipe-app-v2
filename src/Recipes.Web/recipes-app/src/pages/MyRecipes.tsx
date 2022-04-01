import {
  IonCard,
  IonCardContent, IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent, IonGrid,
  IonHeader, IonImg,
  IonPage, IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

function MyRecipes() {
  const cardStyle = {
    margin: '10px 10px 5px 5px',
  };

  // @ts-ignore
  const cards = [...Array(20).keys()].map((i) => (
    <IonCol key={i} size="6" size-sm="4" size-md="3" size-lg="2" size-xl="1">
      <IonCard style={cardStyle} button>
        <IonCardContent>
          <IonImg src="/assets/icon/icon.png" />
        </IonCardContent>
        <IonCardHeader>
          <IonCardTitle style={{ fontSize: '14px' }}>Card Title</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </IonCol>
  ));

  return (
    <IonPage>
      <IonHeader collapse="fade" translucent>
        <IonToolbar>
          <IonTitle>Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Recipes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {cards}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default MyRecipes;
