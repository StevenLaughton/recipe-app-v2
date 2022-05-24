import React, { useCallback, useEffect, useState } from 'react';
import {
  IonButton, IonButtons,
  IonCard, IonIcon, IonItem,
  IonLabel, IonListHeader,
  IonText, useIonAlert,
} from '@ionic/react';
import { useParams } from 'react-router';
import { useFetch } from 'use-http';
import { createOutline, trashOutline } from 'ionicons/icons';
import { Recipe } from '../models/recipe';
import routes from '../models/constants/routes';
import AppPage from '../components/AppPage';
import responseRoutingHook from '../hooks/responseRoutingHook';
import PortionSelect from '../components/PortionSelect';
import { Step } from '../models/step';
import { Ingredient } from '../models/ingredient';

type RouteParams = {
  recipeId: string;
};

function View() {
  const { recipeId } = useParams<RouteParams>();
  const {
    get, del, response, loading,
  } = useFetch<Recipe>('recipes');
  const { ifResponseOkNavigate } = responseRoutingHook(routes.home);
  const [recipe, setRecipe] = useState<Recipe>();
  const [multiplier, setMultiplier] = useState<number>(1);
  const [present] = useIonAlert();

  useEffect(() => {
    get(`id?id=${recipeId}`)
      .then((loadedRecipe: Recipe) => {
        if (response.ok) setRecipe(loadedRecipe);
      });
  }, [recipeId]);

  const deleteRecipe = async () => {
    await del(`id?id=${recipeId}`);
    ifResponseOkNavigate(response);
  };
  const showAreYouSure = async () => {
    await present({
      header: 'Are you sure!',
      message: `Delete ${recipe?.name}?`,
      buttons: [
        'Cancel',
        { text: 'Ok', handler: deleteRecipe },
      ],
    });
  };

  const IngredientList = useCallback(() => (
    <IonCard>
      { recipe?.ingredients.map((ingredient: Ingredient) => (
        <IonItem key={ingredient.id}>
          <IonText>
            { ingredient.isGroupHeader && <h4>{ ingredient.text }</h4> }
            { !ingredient.isGroupHeader
              && (
                <span>
                  { `${multiplier * (ingredient?.quantity ?? 1)} ${ingredient.text}` }
                </span>
              ) }
          </IonText>
        </IonItem>
      )) }
    </IonCard>
  ), [recipe, multiplier]);

  const StepList = useCallback(() => (
    <IonCard>
      { recipe?.steps.map((step: Step) => (
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
      toolbarButtons={(
        <IonButtons slot="end" collapse>
          <IonButton routerLink={`${routes.edit}/${recipeId}`}>
            <IonIcon slot="icon-only" icon={createOutline} />
          </IonButton>
          <IonButton onClick={showAreYouSure}>
            <IonIcon slot="icon-only" icon={trashOutline} />
          </IonButton>
        </IonButtons>
      )}
    >
      <IonListHeader>
        <IonLabel>Ingredients</IonLabel>
        <PortionSelect recipePortions={recipe?.portions ?? 1} setMultiplier={setMultiplier} />
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
