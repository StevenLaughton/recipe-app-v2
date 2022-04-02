import {
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle, IonToggle,
  IonToolbar,
} from '@ionic/react';
import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Recipe } from '../models/recipe';

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
  } as Recipe), []);

  const { control, handleSubmit } = useForm<Recipe>({ defaultValues });
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList inset>
            <IonItem>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <IonInput
                    onIonChange={onChange}
                    value={value}
                    placeholder="name"
                  />
                )}
                name="name"
                control={control}
              />
            </IonItem>
            <IonItem>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <IonInput
                    onIonChange={onChange}
                    type="number"
                    value={value}
                    placeholder="Portions"
                  />
                )}
                name="portions"
                control={control}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Vegetarian: </IonLabel>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <IonToggle
                    onIonChange={(e: CustomEvent<CheckboxChangeEventDetail>) => {
                      onChange(e?.detail.checked);
                    }}
                    checked={value}
                  />
                )}
                name="isVegetarian"
                control={control}
              />
            </IonItem>
          </IonList>
          <IonList inset>
            <IonItem>
              <IonLabel>Vegetarian: </IonLabel>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <IonCheckbox
                    onIonChange={(e: CustomEvent<CheckboxChangeEventDetail>) => {
                      onChange(e?.detail.checked);
                    }}
                    checked={value}
                  />
                )}
                name="isVegetarian"
                control={control}
              />
            </IonItem>
          </IonList>
          <button type="submit">Submit</button>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default Add;
