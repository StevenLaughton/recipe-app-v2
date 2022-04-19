import React, { useCallback } from 'react';
import {
  IonCard,
  IonContent, IonHeader, IonItem,
  IonLabel, IonListHeader, IonLoading, IonPage, IonText, IonTitle, IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router';
import { useFetch } from 'use-http';
import { Ingredient, Recipe, Step } from '../models/recipe';

type RouteParams = {
  recipeId: string;
};

function View() {
  const { recipeId } = useParams<RouteParams>();
  const { data: recipe, loading } = useFetch<Recipe>(`recipes/get/id?id=${recipeId}`, {}, [recipeId]);

  const IngredientList = useCallback(() => (
    <IonCard>
      {recipe?.ingredients.map((ingredient: Ingredient) => (
        <IonItem>
          <IonText>
            { ingredient.isGroupHeader && <h4>{ ingredient.text }</h4> }
            { !ingredient.isGroupHeader
              && (
                <span>
                  { `${ingredient?.quantity} ${ingredient.text}` }
                </span>
              ) }
          </IonText>
        </IonItem>
      )) }
    </IonCard>
  ), [recipe]);

  const StepList = useCallback(() => (
    <IonCard>
      {recipe?.steps.map((step: Step) => (
        <IonItem>
          <IonText>
            { step.isGroupHeader && <h4>{ step.text }</h4> }
            { !step.isGroupHeader
              && (
                <p>
                  { step.text }
                </p>
              ) }
          </IonText>
        </IonItem>
      )) }
    </IonCard>
  ), [recipe]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{ recipe?.name }</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <IonHeader collapse="condense">
          <IonToolbar color="light">
            <IonTitle size="large">{ recipe?.name }</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLoading isOpen={loading} />
        <IonListHeader>
          <IonLabel>Ingredients</IonLabel>
        </IonListHeader>
        <IngredientList />
        <IonListHeader>
          <IonLabel>Steps</IonLabel>
        </IonListHeader>
        <StepList />
      </IonContent>
    </IonPage>
  );
}

export default View;
