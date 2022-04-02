import {
  IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonPage, IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import RecipeCard from '../components/RecipeCard';

function MyRecipes() {
  // @ts-ignore
  const cards = [...Array(20).keys()].map((i) => (
    <IonCol key={i} size="6" size-sm="4" size-md="3" size-lg="2" size-xl="1">
      <RecipeCard />
    </IonCol>
  ));

  return (
    <IonPage>
      <IonHeader collapse="fade" translucent>
        <IonToolbar>
          <IonTitle>Recipes2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <IonHeader collapse="condense">
          <IonToolbar color="light">
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
