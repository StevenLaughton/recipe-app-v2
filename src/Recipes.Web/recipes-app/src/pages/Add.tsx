import {
  IonButton,
  IonCard,
  IonContent, IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonListHeader, IonLoading,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar, useIonRouter,
} from '@ionic/react';
import React, { useMemo } from 'react';
import {
  useForm, Controller, FormProvider,
} from 'react-hook-form';
import { useFetch } from 'use-http';
import { yupResolver } from '@hookform/resolvers/yup';
import { Recipe, recipeSchema } from '../models/recipe';
import IngredientsInput from '../components/IngredientsInput';
import AppInput from '../components/AppInput';
import StepsInput from '../components/StepsInput';
import ImageInput from '../components/ImageInput';
import ErrorMessage from '../components/ErrorMessage';
import routes from '../models/constants/routes';

export interface CheckboxChangeEventDetail {
  value: any;
  checked: boolean;
}

function Add() {
  const defaultValues = useMemo(() => recipeSchema.getDefaultFromShape(), []);

  const { push } = useIonRouter();
  const form = useForm<Recipe>({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });
  const { post, response, loading } = useFetch('recipes');

  const onSubmit = async (data: Recipe) => {
    await post('save', data);
    if (response.ok) push(routes.home);
  };

  return (
    <IonPage>
      <IonLoading isOpen={loading} message="Saving Recipe" />
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
      </IonContent>
    </IonPage>
  );
}

export default Add;
