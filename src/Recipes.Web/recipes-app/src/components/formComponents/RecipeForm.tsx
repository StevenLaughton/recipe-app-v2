import {
  IonButton, IonCard, IonGrid, IonItem, IonLabel, IonListHeader, IonToggle,
} from '@ionic/react';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import React from 'react';
import AppInput from './AppInput';
import ErrorMessage from './ErrorMessage';
import IngredientsInput from './IngredientsInput';
import StepsInput from './StepsInput';
import ImageInput from './ImageInput';
import { Recipe } from '../../models/recipe';

export interface CheckboxChangeEventDetail {
  value: any;
  checked: boolean;
}

interface Props {
  form: UseFormReturn<Recipe>
  onSubmit: (data: Recipe) => void,
}

function RecipeForm({ form, onSubmit }:Props) {
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <IonCard>
          <IonItem>
            <AppInput name="name" placeholder="Name" inputmode="text" autoCapitalize="words" />
            <ErrorMessage control="name" state={form.formState} />
          </IonItem>
          <IonItem>
            <AppInput name="portions" placeholder="Portions" inputmode="numeric" autoCapitalize="off" />
            <ErrorMessage control="portions" state={form.formState} />
          </IonItem>
          <IonItem lines="none">
            <IonLabel>Vegetarian: </IonLabel>
            <Controller
              render={({ field: { onChange, value } }) => (
                <IonToggle
                  onIonChange={(e: CustomEvent<CheckboxChangeEventDetail>) => {
                    onChange(e?.detail.checked);
                  }}
                  checked={value}
                  color="success"
                />
              )}
              name="isVegetarian"
              control={form.control}
            />
          </IonItem>
        </IonCard>
        <IonListHeader>
          <IonLabel>Ingredients</IonLabel>
        </IonListHeader>
        <IonCard>
          <IngredientsInput />
        </IonCard>
        <IonListHeader>
          <IonLabel>Steps</IonLabel>
        </IonListHeader>
        <IonCard>
          <StepsInput />
        </IonCard>

        <IonListHeader>
          <IonLabel>Picture</IonLabel>
        </IonListHeader>
        <IonCard>
          <IonGrid>
            <ImageInput />
          </IonGrid>
        </IonCard>
        <IonButton expand="block" type="submit">Submit</IonButton>
      </form>
    </FormProvider>
  );
}

export default RecipeForm;
