import {
  IonCol,
  IonGrid,
  IonLoading,
  IonRow,
} from '@ionic/react';
import React from 'react';
import { useFetch } from 'use-http';
import RecipeCard from '../components/RecipeCard';
import { RecipeListItem } from '../models/recipe-list-item';
import AppPage from '../components/AppPage';

function MyRecipes() {
  const { data: recipeListItems = [], loading } = useFetch('recipes/getList', {}, []);

  return (
    <AppPage title="Recipes" isLoading={loading} loadingMessage="Loading Recipes">
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
    </AppPage>
  );
}

export default MyRecipes;
