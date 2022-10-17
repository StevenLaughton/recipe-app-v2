import {
  InferType, mixed, number, object, string,
} from 'yup';

export const recipeImageSchema = object({
  id: number().default(0),
  filename: string().required(),
  data: mixed<Blob>().required(),
});

export type RecipeImage = InferType<typeof recipeImageSchema>;
