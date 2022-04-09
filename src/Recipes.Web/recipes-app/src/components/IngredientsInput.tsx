import React from 'react';
import { IonInput } from '@ionic/react';
import {
  Controller, FieldValues, useFieldArray, useFormContext,
} from 'react-hook-form';
import InputItem from './InputItem';

function IngredientsInput() {
  const { register, control } = useFormContext();
  const { fields, insert, remove } = useFieldArray({ control, name: 'ingredients' });

  function insertNewRowIfEnter({ key } : React.KeyboardEvent, index: number): void {
    if (key.toLowerCase() === 'enter') {
      insert(index, { value: '' }, { shouldFocus: true });
    }
  }
  // @ts-ignore
  // eslint-disable-next-line max-len
  function parseAndInsert(event: React.ClipboardEvent<HTMLIonInputElement>, start: number): void {
    event.stopPropagation();
    remove(start);
    const values = event.clipboardData?.getData('text/plain').split(/\r?\n/) as string[];
    values.map((value, index) => insert(start + index, { value }));
  }

  return (
    <>
      {fields.map((item: FieldValues, index) => (
        <InputItem key={item.id} fields={fields} remove={() => remove(index)}>
          <Controller
            render={({ field: { onChange, value } }) => (
              <IonInput
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register(`ingredients.${index}.value` as const, { required: true })}
                onIonChange={onChange}
                value={value}
                onPaste={(event$) => parseAndInsert(event$, index)}
                onKeyDown={(event$) => insertNewRowIfEnter(event$, index)}
              />
            )}
            control={control}
            name={`ingredients.${index}.value`}
          />
        </InputItem>
      ))}
    </>
  );
}

export default IngredientsInput;
