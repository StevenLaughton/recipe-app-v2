import { RecipeImage } from './recipe-image';

export interface Recipe {
  id: number | null;
  name: string | null;
  portions: number | null;
  isVegetarian: boolean;
  ingredients: Ingredient[];
  steps: Step[];
  image: RecipeImage;
}

export interface Step {
  text: string;
  isGroupHeader: boolean;
}

export interface Ingredient {
  quantity: number | null;
  text: string;
  isGroupHeader: boolean;
}
