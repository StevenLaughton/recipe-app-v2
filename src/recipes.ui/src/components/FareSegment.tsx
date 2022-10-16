import {IonLabel, IonSegment, IonSegmentButton, SegmentChangeEventDetail} from '@ionic/react';
import React from 'react';
import Fare from "../models/constants/fare";

type FareSegmentProps = {
    state: Fare;
    setState: React.Dispatch<React.SetStateAction<Fare>>;
}

function FareSegment({state, setState}: FareSegmentProps) {

    return (
            <IonSegment value={state} onIonChange={(e: CustomEvent<SegmentChangeEventDetail>) => {
                setState(e.detail.value as Fare)
            }}>
                <IonSegmentButton value="Food">
                    <IonLabel>Food</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Drink">
                    <IonLabel>Drink</IonLabel>
                </IonSegmentButton>
            </IonSegment>
    );
}

export default FareSegment;
