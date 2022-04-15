import {
  IonButton,
  IonCard,
  IonContent, IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import React, { useMemo } from 'react';
import {
  useForm, Controller, FormProvider,
} from 'react-hook-form';
import { Recipe } from '../models/recipe';
import IngredientsInput from '../components/IngredientsInput';
import AppInput from '../components/AppInput';
import StepsInput from '../components/StepsInput';
import ImageInput from '../components/ImageInput';

export interface CheckboxChangeEventDetail {
  value: any;
  checked: boolean;
}

function Add() {
  const defaultValues = useMemo(() => ({
    id: null,
    name: null,
    portions: null,
    isVegetarian: false,
    ingredients: [{ quantity: null, text: '', isGroupHeader: false }],
    steps: [{ text: '', isGroupHeader: false }],
  } as Recipe), []);

  const form = useForm<Recipe>({ defaultValues });

  // eslint-disable-next-line no-console
  const onSubmit = (data: Recipe) => console.log(data);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Recipe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <IonHeader collapse="condense">
          <IonToolbar color="light">
            <IonTitle size="large">Add Recipe</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <IonCard>
              <IonItem>
                <AppInput name="name" placeholder="Name" inputmode="text" autoCapitalize="words" />
              </IonItem>
              <IonItem>
                <AppInput name="portions" placeholder="Portions" inputmode="numeric" autoCapitalize="off" />
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
      </IonContent>
    </IonPage>
  );
}

export default Add;
