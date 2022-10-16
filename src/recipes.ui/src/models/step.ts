import {
  boolean, InferType, number, object, string,
} from 'yup';

export const stepSchema = object({
  id: number().required().default(0),
  text: string().required('step is required').max(512),
  isGroupHeader: boolean().default(false),
});

export interface Step extends InferType<typeof stepSchema> {
}
