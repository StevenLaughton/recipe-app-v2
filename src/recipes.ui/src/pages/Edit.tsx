import React, { useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import { useIonRouter } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import RecipesService from '../services/recipes.service';
import AppPage from '../components/AppPage';
import routes from '../models/constants/routes';
import RecipeForm from '../components/form/RecipeForm';
import { Recipe, recipeSchema } from '../models/recipe';

type EditPageProps = RouteComponentProps<{ id: string }>;

function Edit({ match }: EditPageProps) {
  const { push } = useIonRouter();
  const defaultValues = useMemo(() => recipeSchema.getDefaultFromShape(), []);

  const form = useForm<Recipe>({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  const query = useQuery<Recipe>(['recipe', +match.params.id], () => RecipesService.get(+match.params.id), {
    onSuccess: (recipe) => {
      form.reset(recipe);
    },
  });

  const onSubmit = async (data: Recipe) => {
    RecipesService.edit(data)
      .then(() => push(routes.home));
  };

  return (
    <AppPage title={query.data?.name} isLoading={false}>
      <RecipeForm form={form} onSubmit={onSubmit} />
    </AppPage>
  );
}

export default Edit;
