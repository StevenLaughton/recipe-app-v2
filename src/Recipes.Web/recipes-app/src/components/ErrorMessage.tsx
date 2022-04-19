import { FieldValues, FormState, useFormContext } from 'react-hook-form';
import { IonLabel } from '@ionic/react';
import React from 'react';

export default function ErrorMessage(props: { control: string, state: FormState<FieldValues> }) {
  const { control, state } = props;
  const { getFieldState } = useFormContext();
  const { error } = getFieldState(control, state);
  // @ts-ignore
  return (
    <IonLabel color="danger" className="ion-text-wrap" style={{ fontStyle: 'italic' }}>
      {error?.message}
    </IonLabel>
  );
}
