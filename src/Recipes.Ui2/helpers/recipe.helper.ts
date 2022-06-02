import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { Step } from '../models/step';

export default function convertToFormData(data: Recipe): FormData {
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
