import {
  array, boolean, InferType, mixed, number, object, string,
} from 'yup';
import Fare from './constants/fare';
import { stepSchema } from './step';
import { ingredientSchema } from './ingredient';
import { recipeImageSchema } from './recipeImage';

export const recipeSchema = object({
  id: number().required().default(0),
  name: string().required().max(256, 'name is too long'),
  portions: number()
    .required('portions are required')
    .typeError('portions must be a number')
    .min(1),
  isVegetarian: boolean().default(false),
  fare: mixed<Fare>()
    .oneOf(['Food', 'Drink'])
    .required()
    .default('Food'),
  image: recipeImageSchema.nullable(),
  imageUrl: string().nullable(),
  ingredients: array().of(ingredientSchema)
    .default([ingredientSchema.getDefaultFromShape()])
    .required(),
  steps: array().of(stepSchema)
    .default([stepSchema.getDefaultFromShape()])
    .required(),
  tags: array(),
}).required();

export type Recipe = InferType<typeof recipeSchema>;
