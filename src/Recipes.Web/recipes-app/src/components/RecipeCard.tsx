import React, { Suspense } from 'react';
import {
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg, IonSpinner,
} from '@ionic/react';

function RecipeCard() {
  const cardStyle = {
    margin: '10px 10px 5px 5px',
  };

  return (
    <IonCard style={cardStyle} button>
      <IonCardContent>
        <Suspense fallback={<IonSpinner />}>
          <IonImg src="/assets/icon/fast-food.svg" />
        </Suspense>
      </IonCardContent>
      <IonCardHeader>
        <IonCardTitle style={{ fontSize: '14px' }}>Card Title</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
}

export default RecipeCard;
