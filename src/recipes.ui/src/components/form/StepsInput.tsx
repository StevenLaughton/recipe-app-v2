import React, { ClipboardEvent, KeyboardEvent } from 'react';
import { IonTextarea } from '@ionic/react';
import {
  Controller, FieldValues, useFieldArray, useFormContext,
} from 'react-hook-form';
import InputItem from './InputItem';
import ErrorMessage from './ErrorMessage';
import {stepSchema} from "../../models/step";

function StepsInput() {
  const {
    register, control, getValues, watch, formState,
  } = useFormContext();
  const {
    fields, insert, remove, update,
  } = useFieldArray({ control, name: 'steps' });

  function insertNewRowIfEnter({ key } : KeyboardEvent, index: number): void {
    if (key.toLowerCase() === 'enter') {
      insert(index + 1, stepSchema.getDefault(), { shouldFocus: true });
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
                  {...register(`steps.${index}.text` as const)}
                  className="px-2 py-2"
                  onIonChange={onChange}
                  value={value}
                  rows={1}
                  autoGrow
                  onPaste={(event$) => parseAndInsert(event$, index)}
                  onKeyDown={(event$) => insertNewRowIfEnter(event$, index)}
                  style={{ fontWeight: watch(`steps.${index}.isGroupHeader`) ? 'bold' : 'normal' }}
                />
              )}
              control={control}
              name={`steps.${index}.text`}
            />
            <ErrorMessage control={`steps.${index}.text`} state={formState} position="stacked" />
          </InputItem>
      ))}
    </>
  );
}

export default StepsInput;
