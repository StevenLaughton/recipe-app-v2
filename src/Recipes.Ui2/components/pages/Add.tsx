import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useFetch } from 'use-http';
import { yupResolver } from '@hookform/resolvers/yup';
import routes from "../../models/constants/routes";
import {Recipe, recipeSchema} from "../../models/recipe";
import AppPage from "../ui/AppPage";
import RecipeForm from "../ui/form/RecipeForm";
import useNavigation from "../../hooks/navigation.hooks";
import convertToFormData from "../../helpers/recipe.helper";

function Add() {
  const defaultValues = useMemo(() => recipeSchema.getDefaultFromShape(), []);
  const { post, loading, response } = useFetch('recipes');
  const { navigateIfOk } = useNavigation(routes.home);

  const form = useForm<Recipe>({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  const onSubmit = async (data: Recipe) => {
    const formData = convertToFormData(data);
    await post('add', formData);
    navigateIfOk(response);
  };

  return (
    <AppPage title="Add Recipe" isLoading={loading} loadingMessage="Saving Recipe">
      <RecipeForm form={form} onSubmit={onSubmit} />
    </AppPage>
  );
}

export default Add;
