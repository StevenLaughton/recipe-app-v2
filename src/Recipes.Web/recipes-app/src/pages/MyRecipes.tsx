import {
  IonCol,
  IonContent, IonGrid,
  IonHeader, IonLoading,
  IonPage, IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useFetch } from 'use-http';
import RecipeCard from '../components/RecipeCard';
import { RecipeListItem } from '../models/recipe-list-item';

function MyRecipes() {
  const { data: recipeListItems = [], loading } = useFetch('recipes/getList', {}, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <IonHeader collapse="condense">
          <IonToolbar color="light">
            <IonTitle size="large">Recipes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonLoading isOpen={loading} message="Loading Recipes" />
            { recipeListItems.map((item: RecipeListItem) => (
              <IonCol key={item.recipeId} size="6" size-sm="4" size-md="3" size-lg="2" size-xl="1">
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <RecipeCard {...item} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default MyRecipes;
