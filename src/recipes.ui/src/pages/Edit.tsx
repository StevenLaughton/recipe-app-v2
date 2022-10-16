import {Recipe, recipeSchema} from "../models/recipe";
import RecipeForm from "../components/form/RecipeForm";
import {useEffect, useMemo, useState} from "react";
import routes from "../models/constants/routes";
import AppPage from "../components/AppPage";
import {RouteComponentProps} from 'react-router';
import RecipesService from "../services/recipes.service";
import {useIonRouter} from "@ionic/react";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

interface EditPageProps extends RouteComponentProps<{ id: string }> {
}

function Edit({match}: EditPageProps) {
    const {push} = useIonRouter();
    const defaultValues = useMemo(() => recipeSchema.getDefaultFromShape(), []);
    const [recipe, setRecipe] = useState<Recipe>();

    const form = useForm<Recipe>({
        defaultValues,
        resolver: yupResolver(recipeSchema),
    });

    useEffect(() => {
        RecipesService.get(match.params.id)
                .then((recipe: Recipe) => {
                    setRecipe(recipe);
                    form.reset(recipe)
                })
                .catch(e => console.error(e));
    }, [match.params.id]);

    useEffect(() => {
        form.reset(recipe);
    }, [recipe, form]);

    const onSubmit = async (data: Recipe) => {
        RecipesService.edit(data)
                .then(_ => push(routes.home))
    };

    return (
            <AppPage title={recipe?.name} isLoading={false}>
                <RecipeForm form={form} onSubmit={onSubmit}/>
            </AppPage>
    );
}

export default Edit;
