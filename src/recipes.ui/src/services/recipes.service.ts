import http from "../http-common";
import Fare from '../models/constants/fare';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import { Step } from '../models/step';
import { PaginatedList } from '../types/paginatedList';
import { RecipeListItem } from '../types/recipeListItem';


const get = (id: number): Promise<Recipe> => {
    return http.get<Recipe>(`/Recipes/id?id=${id}`);
}

const getList = (pageNumber: number, fare: Fare): Promise<PaginatedList<RecipeListItem>> => {
    return http.get<Recipe>(`/Recipes/getList?pageNumber=${pageNumber}&pageSize=10&fare=${fare}`);
}

const add = (model: Recipe): Promise<void> => {
    const formData = convert(model);

    return http.post('/Recipes/Add', formData)
}

const edit = (model: Recipe): Promise<void> => {
    const formData = convert(model);

    return http.put('/Recipes/Edit', formData)
}

const del = (id: number): Promise<void> => {
    return http.delete(`/Recipes/id?id=${id}`);
    
}

const convert = (data: Recipe): FormData => {
    const formData = new FormData();
    formData.append('id', data.id.toString());
    formData.append('name', data.name);
    formData.append('portions', data.portions.toString());
    formData.append('isVegetarian', data.isVegetarian.toString());
    formData.append('fare', data.fare.toString());
    if (data.image) {
        formData.append('image', data.image.data, data.image.filename);
    }
    data.ingredients.forEach((ingredient: Ingredient, index: number) => {
        formData.append(`ingredients[${index}].id`, ingredient.id.toString());
        formData.append(`ingredients[${index}].text`, ingredient.text.toString());
        formData.append(`ingredients[${index}].isGroupHeader`, ingredient.isGroupHeader.toString());
        if (ingredient.quantity) {
            formData.append(`ingredients[${index}].quantity`, ingredient.quantity.toString());
        }
    });
    data.steps.forEach((step: Step, index: number) => {
        formData.append(`steps[${index}].id`, step.id.toString());
        formData.append(`steps[${index}].text`, step.text.toString());
        formData.append(`steps[${index}].isGroupHeader`, step.isGroupHeader.toString());
    });
    // formData.append('tags', data.id.toString());

    return formData;
}

const RecipesService = {
    get,
    getList,
    add,
    edit,
    del
};

export default RecipesService;