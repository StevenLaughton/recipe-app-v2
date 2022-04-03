import {
  IonButton,
  IonContent,
  IonHeader, IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList, IonListHeader,
  IonPage,
  IonTitle, IonToggle,
  IonToolbar,
} from '@ionic/react';
import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { addCircleOutline } from 'ionicons/icons';
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
          <IonList inset lines="inset">
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
            <IonItem lines="none">
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

          <IonListHeader>
            <IonLabel>Steps</IonLabel>
          </IonListHeader>
          <IonList inset>
            <IonItem>
              <IonIcon icon={addCircleOutline} slot="end" />
              <Controller
                render={({ field: { onChange, value } }) => (
                  <IonInput
                    onIonChange={onChange}
                    value={value}
                  />
                )}
                name="name"
                control={control}
              />
            </IonItem>
          </IonList>

          <IonListHeader>
            <IonLabel>Ingrediants</IonLabel>
          </IonListHeader>
          <IonList inset>
            <IonItem>
              <IonIcon icon={addCircleOutline} slot="end" />
              <Controller
                render={({ field: { onChange, value } }) => (
                  <IonInput
                    onIonChange={onChange}
                    value={value}
                  />
                )}
                name="name"
                control={control}
              />
            </IonItem>
          </IonList>
          <IonButton expand="block" type="submit">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default Add;
