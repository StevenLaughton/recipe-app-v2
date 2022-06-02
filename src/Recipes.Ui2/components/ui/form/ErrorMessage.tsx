import { FieldValues, FormState, useFormContext } from 'react-hook-form';
import { IonLabel } from '@ionic/react';
import React from 'react';

type Position = 'fixed' | 'stacked' | 'floating' | undefined;

interface Props{
  control: string,
  state: FormState<FieldValues>,
  position?: Position
}
interface FunctionProps extends Partial<Props>{
  control: string,
  state: FormState<FieldValues>,
}

export default function ErrorMessage({ control, state, position }: FunctionProps) {
  const { getFieldState } = useFormContext();
  const { error } = getFieldState(control, state);
  // @ts-ignore
  return (
    <IonLabel color="danger" position={position} className="ion-text-wrap" style={{ fontStyle: 'italic' }}>
      {error?.message}
    </IonLabel>
  );
}
