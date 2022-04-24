import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import React from 'react';
import Fare from '../models/constants/fare';

function FareSegment({ onChange, value }: { value: Fare, onChange: (v: Fare) => void }) {
  return (
    <IonSegment value={value} onIonChange={(e: any) => onChange(e.detail.value)} color="medium">
      <IonSegmentButton value="food">
        <IonLabel>Food</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="drink">
        <IonLabel>Drink</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
}

export default FareSegment;
