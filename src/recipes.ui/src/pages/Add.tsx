import React, { useMemo } from 'react';
import { useIonRouter } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import routes from '../models/constants/routes';
import RecipesService from '../services/recipes.service';
import { Recipe, recipeSchema } from '../models/recipe';
import AppPage from '../components/AppPage';
import RecipeForm from '../components/form/RecipeForm';

function Add() {
  const { push } = useIonRouter();

  const defaultValues = useMemo(() => recipeSchema.getDefaultFromShape(), []);

  const form = useForm<Recipe>({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  const onSubmit = (data: Recipe) => {
    RecipesService.add(data).then(() => push(routes.home));
  };

  return (
    <AppPage title="Add Recipe" isLoading={false}>
      <RecipeForm form={form} onSubmit={onSubmit} />
    </AppPage>
  );
}

export default Add;
