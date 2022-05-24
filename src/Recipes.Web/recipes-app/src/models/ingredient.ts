import {
  boolean, InferType, number, object, string,
} from 'yup';

export const ingredientSchema = object({
  id: number().required().default(0),
  quantity: number()
    .nullable(true)
    .typeError('quantity must be a number')
    .when('isGroupHeader', {
      is: true,
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema
        .required('a quantity is required')
        .min(0, 'quantity must be greater than 0'),
    }),
  text: string().required('ingredient is required').max(256),
  isGroupHeader: boolean().default(false),
});

export interface Ingredient extends InferType<typeof ingredientSchema> {
}
