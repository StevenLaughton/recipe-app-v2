import React, { ClipboardEvent, KeyboardEvent } from 'react';
import { IonTextarea } from '@ionic/react';
import {
  Controller, FieldValues, useFieldArray, useFormContext,
} from 'react-hook-form';
import InputItem from './InputItem';

function StepsInput() {
  const {
    register, control, getValues, watch,
  } = useFormContext();
  const {
    fields, insert, remove, update,
  } = useFieldArray({ control, name: 'steps' });

  function insertNewRowIfEnter({ key } : KeyboardEvent, index: number): void {
    if (key.toLowerCase() === 'enter') {
      insert(index + 1, { value: '' }, { shouldFocus: true });
    }
  }

  function parseAndInsert(event: ClipboardEvent<HTMLIonTextareaElement>, start: number): void {
    event.stopPropagation();
    remove(start);
    const values = event.clipboardData?.getData('text/plain').split(/\r?\n/) as string[];
    values.map((value, index) => insert(start + index, { text: value, isGroupHeader: false }));
  }

  return (
    <>
      {fields.map((item: FieldValues, index) => (
        <InputItem
          key={item.id}
          fields={fields}
          remove={() => remove(index)}
          setGroupHeader={() => {
            const currentValue = getValues(`steps.${index}`);
            update(index, { ...currentValue, isGroupHeader: !currentValue.isGroupHeader });
          }}
        >
          <Controller
            render={({ field: { onChange, value } }) => (
              <IonTextarea
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register(`steps.${index}.text` as const, { required: true })}
                autoGrow
                onIonChange={onChange}
                value={value}
                onPaste={(event$) => parseAndInsert(event$, index)}
                onKeyDown={(event$) => insertNewRowIfEnter(event$, index)}
                style={{ fontWeight: watch(`steps.${index}.isGroupHeader`) ? 'bold' : 'normal' }}
              />
            )}
            control={control}
            name={`steps.${index}.text`}
          />
        </InputItem>
      ))}
    </>
  );
}

export default StepsInput;
