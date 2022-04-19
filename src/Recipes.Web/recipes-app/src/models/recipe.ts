import {
  array, boolean, InferType, number, object, string,
} from 'yup';
import { recipeImageSchema } from './recipe-image';

export const stepSchema = object({
  id: number().required().default(0),
  text: string().required('step is required').max(256),
  isGroupHeader: boolean().default(false),
  recipeId: number(),
});

export const ingredientSchema = object({
  id: number().required().default(0),
  quantity: number().when('isGroupHeader', {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required().min(0),
  }),
  text: string().required().max(256),
  isGroupHeader: boolean().default(false),
  recipeId: number().required().default(0),
});

export const recipeSchema = object({
  id: number().required().default(0),
  name: string().required().max(256, 'name is too long'),
  portions: number()
    .required('portions are required')
    .typeError('portions must be a number')
    .min(1),
  isVegetarian: boolean().default(false),
  image: recipeImageSchema.notRequired(),
  ingredients: array().of(ingredientSchema)
    .default([ingredientSchema.getDefaultFromShape()])
    .required(),
  steps: array().of(stepSchema)
    .default([stepSchema.getDefaultFromShape()])
    .required(),
  tags: array(),
}).required();

export interface Recipe extends InferType<typeof recipeSchema> {}

export interface Step extends InferType<typeof stepSchema> {}

export interface Ingredient extends InferType<typeof ingredientSchema> {}
