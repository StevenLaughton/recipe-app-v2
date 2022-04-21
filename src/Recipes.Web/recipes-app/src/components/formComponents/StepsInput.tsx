import React, { ClipboardEvent, Fragment, KeyboardEvent } from 'react';
import { IonTextarea } from '@ionic/react';
import {
  Controller, FieldValues, useFieldArray, useFormContext,
} from 'react-hook-form';
import InputItem from './InputItem';
import ErrorMessage from './ErrorMessage';
import { stepSchema } from '../../models/recipe';

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
        <Fragment key={item.id}>
          <InputItem
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
            <ErrorMessage control={`steps.${index}.text`} state={formState} position="stacked" />
          </InputItem>
        </Fragment>
      ))}
    </>
  );
}

export default StepsInput;
