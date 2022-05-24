import React from 'react';
import { IonTextarea } from '@ionic/react';
import {
  Controller, FieldValues, useFieldArray, useFormContext,
} from 'react-hook-form';
import InputItem from './InputItem';
import ErrorMessage from './ErrorMessage';
import mimeTypes from '../../models/constants/mimeTypes';
import { Ingredient } from '../../models/ingredient';
import parseIngredients from '../../hooks/ingredientHooks';

function IngredientsInput() {
  const {
    register, control, getValues, watch, formState,
  } = useFormContext();
  const {
    fields, insert, remove, update,
  } = useFieldArray({ control, name: 'ingredients' });

  function insertNewRowIfEnter({ key } : React.KeyboardEvent, index: number): void {
    if (key.toLowerCase() === 'enter') {
      insert(index + 1, { quantity: null, text: '', isGroupHeader: false }, { shouldFocus: true });
    }
  }

  // eslint-disable-next-line max-len
  function parseAndInsert(event: React.ClipboardEvent<HTMLIonTextareaElement>, start: number): void {
    event.stopPropagation();
    remove(start);

    const ingredientsString: string = event.clipboardData?.getData(mimeTypes.text);

    const ingredients: Ingredient[] = parseIngredients(ingredientsString);

    ingredients.map((value:Ingredient, index: number) => insert(start + index, {
      ...value,
    }));
  }

  return (
    <>
      {fields.map((item: FieldValues, index) => (
        <InputItem
          key={item.id}
          fields={fields}
          remove={() => remove(index)}
          setGroupHeader={() => {
            const currentValue = getValues(`ingredients.${index}`);
            update(index, { ...currentValue, isGroupHeader: !currentValue.isGroupHeader });
          }}
        >
          <Controller
            render={({ field: { onChange, value } }) => (
              <IonTextarea
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register(`ingredients.${index}.quantity` as const)}
                onIonChange={onChange}
                value={value}
                inputmode="numeric"
                onPaste={(event$) => parseAndInsert(event$, index)}
                onKeyDown={(event$) => insertNewRowIfEnter(event$, index)}
                rows={1}
                autoGrow
                style={{ textAlign: 'end', fontWeight: watch(`ingredients.${index}.isGroupHeader`) ? 'bold' : 'normal' }}
              />
            )}
            control={control}
            name={`ingredients.${index}.quantity`}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <IonTextarea
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register(`ingredients.${index}.text` as const)}
                onIonChange={onChange}
                value={value}
                rows={1}
                autoGrow
                onPaste={(event$) => parseAndInsert(event$, index)}
                onKeyDown={(event$) => insertNewRowIfEnter(event$, index)}
                style={{ flexGrow: 4, fontWeight: watch(`ingredients.${index}.isGroupHeader`) ? 'bold' : 'normal' }}
              />
            )}
            control={control}
            name={`ingredients.${index}.text`}
          />
          <ErrorMessage control={`ingredients.${index}.quantity`} state={formState} />
          <ErrorMessage control={`ingredients.${index}.text`} state={formState} />
        </InputItem>
      ))}
    </>
  );
}

export default IngredientsInput;
