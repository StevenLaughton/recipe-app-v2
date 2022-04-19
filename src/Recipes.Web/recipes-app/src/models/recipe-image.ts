import {
  InferType, number, object, string,
} from 'yup';

export const recipeImageSchema = object({
  id: number().default(0),
  imageData: string().nullable(),
});

export interface RecipeImage extends InferType<typeof recipeImageSchema> {
}
