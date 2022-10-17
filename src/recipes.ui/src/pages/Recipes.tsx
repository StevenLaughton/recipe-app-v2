import { IonButtons } from '@ionic/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RecipeListItem } from '../types/recipeListItem';
import routes from '../models/constants/routes';
import Fare from '../models/constants/fare';
import Card from '../components/Card';
import AppPage from '../components/AppPage';
import FareSegment from '../components/FareSegment';
import RecipesService from '../services/recipes.service';
import AppImage from '../components/AppImage';

function RecipeCard({ name, imageUrl, recipeId }: RecipeListItem) {
  return (
    <Link to={routes.view(recipeId)}>
      <Card className="my-auto mx-auto w-full h-full">
        <AppImage imageData={imageUrl} className="h-44 w-full" />
        <div className="px-4 py-4 ">
          <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">{name}</h2>
        </div>
      </Card>
    </Link>
  );
}

export default function Recipes() {
  const [page] = useState<number>(1);
  const [fare, setFare] = useState<Fare>('Food');
  const query = useQuery(['recipes', { fare, page }], () => RecipesService.getList(page, fare));

  return (
    <AppPage
      title="Recipes"
      isLoading={query.status === 'loading'}
      toolbarButtons={(
        <IonButtons slot="end" collapse className="ion-align-items-baseline">
          <FareSegment state={fare} setState={setFare} />
        </IonButtons>
                     )}
    >

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {
            query.data?.data.map(({ recipeId, name, imageUrl }: RecipeListItem) => (
              <RecipeCard name={name} imageUrl={imageUrl} key={recipeId} recipeId={recipeId} />
            ))
                    }
      </div>
    </AppPage>
  );
}
