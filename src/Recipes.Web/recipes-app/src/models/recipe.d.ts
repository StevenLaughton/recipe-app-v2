export interface Recipe {
  id: number | null;
  name: string | null;
  portions: number | null;
  isVegetarian: boolean;
  steps: string[];
}

export type ListType = {
  value: string;
};

export interface RecipeForm {
  id: number | null;
  name: string | null;
  portions: number | null;
  isVegetarian: boolean;
  steps: ListType[];
  ingredients: ListType[];
}
