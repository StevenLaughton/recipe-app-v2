import React, { useCallback } from 'react';
import {
  IonButton, IonButtons,
  IonCard, IonIcon, IonItem,
  IonLabel, IonListHeader, IonText,
} from '@ionic/react';
import { useParams } from 'react-router';
import { useFetch } from 'use-http';
import { createOutline } from 'ionicons/icons';
import { Ingredient, Recipe, Step } from '../models/recipe';
import routes from '../models/constants/routes';
import AppPage from '../components/AppPage';

type RouteParams = {
  recipeId: string;
};

function View() {
  const { recipeId } = useParams<RouteParams>();
  const { data: recipe, loading } = useFetch<Recipe>(`recipes/get/id?id=${recipeId}`, {}, [recipeId]);

  const IngredientList = useCallback(() => (
    <IonCard>
      {recipe?.ingredients.map((ingredient: Ingredient) => (
        <IonItem key={ingredient.id}>
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
        <IonItem key={step.id}>
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
    <AppPage
      title={recipe?.name}
      isLoading={loading}
      loadingMessage="Loading Recipe"
      toolbarActions={(
        <IonButtons slot="end">
          <IonButton routerLink={`${routes.edit}/${recipeId}`}>
            <IonIcon slot="icon-only" icon={createOutline} />
          </IonButton>
        </IonButtons>
)}
    >
      <IonListHeader>
        <IonLabel>Ingredients</IonLabel>
      </IonListHeader>
      <IngredientList />
      <IonListHeader>
        <IonLabel>Steps</IonLabel>
      </IonListHeader>
      <StepList />
    </AppPage>

  );
}

export default View;
