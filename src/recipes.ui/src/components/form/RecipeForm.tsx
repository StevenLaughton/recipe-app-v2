import {
  IonButton, IonCard, IonGrid, IonLabel, IonListHeader, IonToggle, ToggleChangeEventDetail,
} from '@ionic/react';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import React from 'react';
import AppInput from './AppInput';
import ErrorMessage from './ErrorMessage';
import IngredientsInput from './IngredientsInput';
import StepsInput from './StepsInput';
import ImageInput from './ImageInput';
import FareSegment from '../FareSegment';
import { Recipe } from '../../models/recipe';

interface Props {
  form: UseFormReturn<Recipe>
  onSubmit: (data: Recipe) => void,
}

function RecipeForm({ form, onSubmit }:Props) {
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <IonCard className="my-auto mx-auto w-full shadow-lg">
          <div className="px-2 py-2 rounded-xl text-white">
            <AppInput name="name" placeholder="Name" inputmode="text" autoCapitalize="words" />
            <ErrorMessage control="name" state={form.formState} />
          </div>
          <div className="px-2 py-2 rounded-xl text-white">
            <AppInput name="portions" placeholder="Portions" inputmode="numeric" autoCapitalize="off" />
            <ErrorMessage control="portions" state={form.formState} />
          </div>
          <div className="px-2 py-2 rounded-xl text-white flex justify-between">
            <IonLabel className="inline-block align-middle">Vegetarian: </IonLabel>
            <Controller
              render={({ field: { onChange, value } }) => (
                <IonToggle
                  onIonChange={(e: CustomEvent<ToggleChangeEventDetail>) => onChange(e?.detail.checked)}
                  checked={value}
                  color="success"
                />
              )}
              name="isVegetarian"
              control={form.control}
            />
          </div>
          <div className="px-1 py-1 rounded-xl text-white">
            <Controller
              render={({ field: { onChange, value } }) => (
                <FareSegment state={value} setState={onChange} />
              )}
              name="fare"
              control={form.control}
            />
          </div>
        </IonCard>
        <IonListHeader>
          <IonLabel>Ingredients</IonLabel>
        </IonListHeader>
        <IonCard className="my-auto mx-auto w-full shadow-lg">
          <IngredientsInput />
        </IonCard>
        <IonListHeader>
          <IonLabel>Steps</IonLabel>
        </IonListHeader>
        <IonCard className="my-auto mx-auto w-full shadow-lg">
          <StepsInput />
        </IonCard>

        <IonListHeader>
          <IonLabel>Picture</IonLabel>
        </IonListHeader>
        <IonCard className="my-auto mx-auto w-full shadow-lg">
          <IonGrid>
            <ImageInput />
          </IonGrid>
        </IonCard>
        <IonButton className="mt-4" expand="block" type="submit">Submit</IonButton>
      </form>
    </FormProvider>
  );
}

export default RecipeForm;
