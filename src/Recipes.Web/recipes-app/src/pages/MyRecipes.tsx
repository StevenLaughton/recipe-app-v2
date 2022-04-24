import {
  IonButtons, IonCol, IonGrid, IonLoading, IonRow,
} from '@ionic/react';
import React, { useState } from 'react';
import { useFetch } from 'use-http';
import RecipeCard from '../components/RecipeCard';
import { RecipeListItem } from '../models/recipe-list-item';
import AppPage from '../components/AppPage';
import Fare from '../models/constants/fare';
import FareSegment from '../components/FareSegment';

function MyRecipes() {
  const [fare, setFare] = useState<Fare>('food');
  const { data: recipeListItems = [], loading } = useFetch(`recipes/getList?fare=${fare}`, {}, [fare]);

  return (
    <AppPage
      title="Recipes"
      isLoading={loading}
      loadingMessage="Loading Recipes"
      toolbarButtons={(
        <IonButtons slot="end" collapse>
          <FareSegment value={fare} onChange={setFare} />
        </IonButtons>
)}
    >

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
