import React, { ReactNode } from 'react';
import {
  IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding,
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

export type InputItemProps = {
  children: ReactNode,
  fields: Record<'id', string>[],
  remove: () => void,
};
function InputItem({ children, fields, remove }: InputItemProps) {
  return (
    <IonItemSliding disabled={fields.length === 1}>
      <IonItemOptions side="start">
        <IonItemOption disabled={fields.length === 1} color="danger" onClick={remove}>
          <IonIcon icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
      <IonItem>
        {children}
      </IonItem>
    </IonItemSliding>
  );
}

export default InputItem;
