import {
  IonIcon,
  IonItem, IonSelect, IonSelectOption, SelectChangeEventDetail,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { peopleOutline } from 'ionicons/icons';

function PortionSelect(
  { recipePortions, setMultiplier }: {
    recipePortions: number,
    setMultiplier: (val: number) => void
  },
) {
  const [portions, setPortions] = useState<number>(1);

  useEffect(() => {
    setPortions(recipePortions);
  }, [recipePortions]);

  const updatePortions = (val: number) => {
    setPortions(val);
    setMultiplier(val / recipePortions);
  };

  return (
    <IonItem color="light">
      <IonIcon slot="start" icon={peopleOutline} />
      <IonSelect
        value={portions}
        onIonChange={(e: CustomEvent<SelectChangeEventDetail<number>>) => {
          updatePortions(e.detail.value);
        }}
      >
        <IonSelectOption value={1}>1</IonSelectOption>
        <IonSelectOption value={2}>2</IonSelectOption>
        <IonSelectOption value={3}>3</IonSelectOption>
        <IonSelectOption value={4}>4</IonSelectOption>
        <IonSelectOption value={5}>5</IonSelectOption>
        <IonSelectOption value={6}>6</IonSelectOption>
        <IonSelectOption value={7}>7</IonSelectOption>
        <IonSelectOption value={8}>8</IonSelectOption>
        <IonSelectOption value={9}>9</IonSelectOption>
        <IonSelectOption value={10}>10</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
}

export default PortionSelect;
