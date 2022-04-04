import {
  IonButton,
  IonContent,
  IonHeader, IonIcon,
  IonInput,
  IonItem, IonItemOption, IonItemOptions, IonItemSliding,
  IonLabel,
  IonList, IonListHeader,
  IonPage,
  IonTitle, IonToggle,
  IonToolbar,
} from '@ionic/react';
import React, { useMemo } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { addCircleOutline } from 'ionicons/icons';
import { RecipeForm } from '../models/recipe';

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
    ingredients: [{ value: '' }],
    steps: [{ value: '' }],
  } as RecipeForm), []);
  
  const { control, register, handleSubmit } = useForm<RecipeForm>({ defaultValues });
  const { fields: stepFields, append: appendSteps, remove: removeStep } = useFieldArray({ control, name: 'steps' });
  const { fields: ingredientFields, append: appendIngredients, remove: removeIngredient } = useFieldArray({ control, name: 'ingredients' });

  // eslint-disable-next-line no-console
  const onSubmit = (data: RecipeForm) => console.log(data);

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
            <IonLabel>Ingrediants</IonLabel>
          </IonListHeader>
          <IonList inset>
            {ingredientFields.map((item, index) => (
              <IonItemSliding>
                <IonItemOptions side="start">
                  <IonItemOption color="danger" onClick={() => removeIngredient(index)}>Delete</IonItemOption>
                </IonItemOptions>
                <IonItem key={item.id}>
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <IonInput
                      /* eslint-disable-next-line react/jsx-props-no-spreading */
                        {...register(`ingredients.${index}.value` as const, { required: true })}
                        onIonChange={onChange}
                        value={value}
                      />
                    )}
                    control={control}
                    name={`ingredients.${index}.value`}
                  />
                  {index === (ingredientFields.length - 1)
                  && <IonIcon icon={addCircleOutline} slot="end" onClick={() => appendIngredients({ value: '' })} />}
                </IonItem>
              </IonItemSliding>
            ))}
          </IonList>

          <IonListHeader>
            <IonLabel>Steps</IonLabel>
          </IonListHeader>
          <IonList inset>
            {stepFields.map((item, index) => (
              <IonItemSliding>
                <IonItemOptions side="start">
                  <IonItemOption color="danger" onClick={() => removeStep(index)}>Delete</IonItemOption>
                </IonItemOptions>
                <IonItem key={item.id}>
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <IonInput
                      /* eslint-disable-next-line react/jsx-props-no-spreading */
                        {...register(`steps.${index}.value` as const, { required: true })}
                        onIonChange={onChange}
                        value={value}
                      />
                    )}
                    control={control}
                    name={`steps.${index}.value`}
                  />
                  {index === (stepFields.length - 1)
                  && <IonIcon icon={addCircleOutline} slot="end" onClick={() => appendSteps({ value: '' })} />}
                </IonItem>
              </IonItemSliding>
            ))}
          </IonList>
          <IonButton expand="block" type="submit">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default Add;
