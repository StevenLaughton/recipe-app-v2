import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { useFetch } from 'use-http';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Recipe, recipeSchema } from '../models/recipe';
import AppPage from '../components/AppPage';
import RecipeForm from '../components/formComponents/RecipeForm';

type RouteParams = {
  recipeId: string;
};

function Edit() {
  const defaultValues = useMemo(() => recipeSchema.getDefaultFromShape(), []);
  const { recipeId } = useParams<RouteParams>();
  const { data: recipe, loading } = useFetch<Recipe>(`recipes/get/id?id=${recipeId}`, {}, [recipeId]);
  const form = useForm<Recipe>({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  useEffect(() => {
    form.reset(recipe);
  }, [recipe]);

  const onSubmit = async (data: Recipe) => {
    console.log(data);
  };

  return (
    <AppPage title={recipe?.name} isLoading={loading}>
      <RecipeForm form={form} onSubmit={onSubmit} />
    </AppPage>
  );
}
export default Edit;
