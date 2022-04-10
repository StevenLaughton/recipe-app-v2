export interface Recipe {
  id: number | null;
  name: string | null;
  portions: number | null;
  isVegetarian: boolean;
  ingredients: Ingredient[];
  steps: Step[];
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
