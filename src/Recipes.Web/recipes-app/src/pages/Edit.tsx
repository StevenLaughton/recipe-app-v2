import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { useFetch } from 'use-http';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Recipe, recipeSchema } from '../models/recipe';
import AppPage from '../components/AppPage';
import RecipeForm from '../components/formComponents/RecipeForm';
import routes from '../models/constants/routes';
import responseRoutingHook from '../hooks/responseRoutingHook';

type RouteParams = {
  recipeId: string;
};

function Edit() {
  const defaultValues = useMemo(() => recipeSchema.getDefaultFromShape(), []);
  const { recipeId } = useParams<RouteParams>();
  const {
    put, response, loading: saving,
  } = useFetch('recipes');
  const { ifResponseOkNavigate } = responseRoutingHook(`${routes.view}/${recipeId}`);
  const { data: recipe, loading } = useFetch<Recipe>(`recipes/id?id=${recipeId}&includeImage=true`, {}, [recipeId]);

  const form = useForm<Recipe>({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  useEffect(() => {
    form.reset(recipe);
  }, [recipe]);

  const onSubmit = async (data: Recipe) => {
    await put('update', data);
    ifResponseOkNavigate(response);
  };

  return (
    <AppPage title={recipe?.name} isLoading={loading || saving}>
      <RecipeForm form={form} onSubmit={onSubmit} />
    </AppPage>
  );
}
export default Edit;
