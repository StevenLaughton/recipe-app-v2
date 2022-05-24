import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useFetch } from 'use-http';
import { yupResolver } from '@hookform/resolvers/yup';
import AppPage from '../components/AppPage';
import RecipeForm from '../components/formComponents/RecipeForm';
import responseRoutingHook from '../hooks/responseRoutingHook';
import routes from '../models/constants/routes';
import toFormData from '../extensions/recipeExtensions';
import { Recipe, recipeSchema } from '../models/recipe';

function Add() {
  const defaultValues = useMemo(() => recipeSchema.getDefaultFromShape(), []);
  const { post, loading, response } = useFetch('recipes');
  const { ifResponseOkNavigate } = responseRoutingHook(routes.home);

  const form = useForm<Recipe>({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  const onSubmit = async (data: Recipe) => {
    const formData = toFormData(data);
    await post('add', formData);
    ifResponseOkNavigate(response);
  };

  return (
    <AppPage title="Add Recipe" isLoading={loading} loadingMessage="Saving Recipe">
      <RecipeForm form={form} onSubmit={onSubmit} />
    </AppPage>
  );
}

export default Add;
