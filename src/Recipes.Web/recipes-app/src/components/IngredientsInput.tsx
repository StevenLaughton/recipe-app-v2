import React from 'react';
import { IonInput } from '@ionic/react';
import {
  Controller, FieldValues, useFieldArray, useFormContext,
} from 'react-hook-form';
import InputItem from './InputItem';
import { Ingredient } from '../models/recipe';
import mimeTypes from '../models/constants/mimeTypes';
import parseIngredients from '../hooks/ingredientHooks';

function IngredientsInput() {
  const {
    register, control, getValues, watch,
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
  function parseAndInsert(event: React.ClipboardEvent<HTMLIonInputElement>, start: number): void {
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
              <IonInput
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register(`ingredients.${index}.quantity` as const)}
                onIonChange={onChange}
                value={value}
                inputmode="numeric"
                onPaste={(event$) => parseAndInsert(event$, index)}
                onKeyDown={(event$) => insertNewRowIfEnter(event$, index)}
                size={10}
                style={{ textAlign: 'end', fontWeight: watch(`ingredients.${index}.isGroupHeader`) ? 'bold' : 'normal' }}
              />
            )}
            control={control}
            name={`ingredients.${index}.quantity`}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <IonInput
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register(`ingredients.${index}.text` as const)}
                onIonChange={onChange}
                value={value}
                size={100}
                onPaste={(event$) => parseAndInsert(event$, index)}
                onKeyDown={(event$) => insertNewRowIfEnter(event$, index)}
                style={{ flexGrow: 6, fontWeight: watch(`ingredients.${index}.isGroupHeader`) ? 'bold' : 'normal' }}
              />
            )}
            control={control}
            name={`ingredients.${index}.text`}
          />
        </InputItem>
      ))}
    </>
  );
}

export default IngredientsInput;
