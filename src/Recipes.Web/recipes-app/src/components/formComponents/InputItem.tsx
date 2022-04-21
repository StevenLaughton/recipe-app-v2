import React, { ReactNode } from 'react';
import {
  IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding,
} from '@ionic/react';
import { contrastOutline, trashOutline } from 'ionicons/icons';

export type InputItemProps = {
  children: ReactNode,
  fields: Record<'id', string>[],
  remove: () => void,
  setGroupHeader: () => void,
};
function InputItem({
  children, fields, remove, setGroupHeader,
}: InputItemProps) {
  return (
    <IonItemSliding>
      <IonItemOptions side="end">
        <IonItemOption disabled={fields.length === 1} color="danger" onClick={remove}>
          <IonIcon icon={trashOutline} />
        </IonItemOption>
        <IonItemOption color="primary" onClick={setGroupHeader}>
          <IonIcon icon={contrastOutline} />
        </IonItemOption>
      </IonItemOptions>
      <IonItem>
        {children}
      </IonItem>
    </IonItemSliding>
  );
}

export default InputItem;
