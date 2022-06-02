import React, { useEffect, useMemo } from 'react';
import {RouteComponentProps} from 'react-router';
import { useFetch } from 'use-http';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {Recipe, recipeSchema} from "../../models/recipe";
import routes from "../../models/constants/routes";
import AppPage from "../ui/AppPage";
import RecipeForm from "../ui/form/RecipeForm";
import useNavigation from "../../hooks/navigation.hooks";
import convertToFormData from "../../helpers/recipe.helper";

interface EditPageProps extends RouteComponentProps<{ id: string }> {
}
function Edit({match}: EditPageProps) {
  const defaultValues = useMemo(() => recipeSchema.getDefaultFromShape(), []);
  const {
    put, response, loading: saving,
  } = useFetch('recipes');
  const { navigateIfOk } = useNavigation(routes.home);
  const { data: recipe, loading } = useFetch<Recipe>(`recipes/id?id=${match.params.id}`, {},
      [match.params.id]);

  const form = useForm<Recipe>({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  useEffect(() => {
    form.reset(recipe);
  }, [recipe]);

  const onSubmit = async (data: Recipe) => {
    const formData = convertToFormData(data);
    await put('edit', formData);
    navigateIfOk(response);
  };

  return (
    <AppPage title={recipe?.name} isLoading={loading || saving}>
      <RecipeForm form={form} onSubmit={onSubmit} />
    </AppPage>
  );
}
export default Edit;
