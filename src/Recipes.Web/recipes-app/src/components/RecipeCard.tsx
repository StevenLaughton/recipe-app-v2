import React from 'react';
import {
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg,
} from '@ionic/react';

function RecipeCard() {
  const cardStyle = {
    margin: '10px 10px 5px 5px',
  };

  return (
    <IonCard style={cardStyle} button>
      <IonCardContent>
        <IonImg src="/assets/icon/icon.png" />
      </IonCardContent>
      <IonCardHeader>
        <IonCardTitle style={{ fontSize: '14px' }}>Card Title</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
}

export default RecipeCard;
