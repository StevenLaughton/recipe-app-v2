import { RecipeImage } from './recipe-image';

export interface Recipe {
  id: number | null;
  name: string | null;
  portions: number | null;
  isVegetarian: boolean;
  image: RecipeImage;
  ingredients: Ingredient[];
  steps: Step[];
  tags: []
}

export interface Step {
  id: number;
  text: string;
  isGroupHeader: boolean;
  recipeId: number;
}

export interface Ingredient {
  id: number;
  quantity: number | null;
  text: string;
  isGroupHeader: boolean;
  recipeId: number;
}
