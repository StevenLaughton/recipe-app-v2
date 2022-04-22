import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { useFetch } from 'use-http';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIonRouter } from '@ionic/react';
import { Recipe, recipeSchema } from '../models/recipe';
import AppPage from '../components/AppPage';
import RecipeForm from '../components/formComponents/RecipeForm';
import routes from '../models/constants/routes';

type RouteParams = {
  recipeId: string;
};

function Edit() {
  const defaultValues = useMemo(() => recipeSchema.getDefaultFromShape(), []);
  const { recipeId } = useParams<RouteParams>();
  const { push } = useIonRouter();
  const {
    put, response, loading: saving, cache,
  } = useFetch('recipes');
  const { data: recipe, loading } = useFetch<Recipe>(`recipes/get/id?id=${recipeId}`, {}, [recipeId]);

  const form = useForm<Recipe>({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  useEffect(() => {
    form.reset(recipe);
  }, [recipe]);

  const onSubmit = async (data: Recipe) => {
    await put('update', data);
    if (response.ok) {
      cache.clear();
      push(`${routes.view}/${recipeId}`);
    }
  };

  return (
    <AppPage title={recipe?.name} isLoading={loading || saving}>
      <RecipeForm form={form} onSubmit={onSubmit} />
    </AppPage>
  );
}
export default Edit;
