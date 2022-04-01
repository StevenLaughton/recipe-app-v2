export interface Recipe {
  id: number | null;
  name: string | null;
  portions: number | null;
  isVegetarian: boolean;
  steps: string[];
}
