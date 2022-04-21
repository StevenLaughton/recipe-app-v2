import { useIonRouter } from '@ionic/react';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useFetch } from 'use-http';
import { yupResolver } from '@hookform/resolvers/yup';
import { Recipe, recipeSchema } from '../models/recipe';
import routes from '../models/constants/routes';
import AppPage from '../components/AppPage';
import RecipeForm from '../components/formComponents/RecipeForm';

function Add() {
  const defaultValues = useMemo(() => recipeSchema.getDefaultFromShape(), []);
  const { push } = useIonRouter();
  const { post, response, loading } = useFetch('recipes');
  const form = useForm<Recipe>({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  const onSubmit = async (data: Recipe) => {
    await post('save', data);
    if (response.ok) push(routes.home);
  };

  return (
    <AppPage title="Add Recipe" isLoading={loading} loadingMessage="Saving Recipe">
      <RecipeForm form={form} onSubmit={onSubmit} />
    </AppPage>
  );
}

export default Add;
