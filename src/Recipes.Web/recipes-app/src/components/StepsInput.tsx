import React, { Fragment } from 'react';
import {
  IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding,
} from '@ionic/react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { addCircleOutline } from 'ionicons/icons';

function StepsInput() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'steps' });

  return (
    <>
      {fields.map((item, index) => (
        <Fragment key={item.id}>
          <IonItemSliding>
            <IonItemOptions side="start">
              <IonItemOption disabled={fields.length === 1} color="danger" onClick={() => remove(index)}>
                Delete
              </IonItemOption>
            </IonItemOptions>
            <IonItem>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <IonInput
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...register(`steps.${index}.value` as const, { required: true })}
                    onIonChange={onChange}
                    value={value}
                  />
                )}
                control={control}
                name={`steps.${index}.value`}
              />
              {index === (fields.length - 1)
                && <IonIcon icon={addCircleOutline} slot="end" onClick={() => append({ value: '' })} />}
            </IonItem>
          </IonItemSliding>
        </Fragment>
      ))}
    </>
  );
}

export default StepsInput;
