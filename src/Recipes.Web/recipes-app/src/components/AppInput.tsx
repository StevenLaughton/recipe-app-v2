import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IonInput } from '@ionic/react';

export type AppInputProps = {
  name: string;
  placeholder: string;
  inputmode: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
};

function AppInput({ name, placeholder, inputmode }: AppInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <IonInput
          onIonChange={onChange}
          value={value}
          placeholder={placeholder}
          inputmode={inputmode}
        />
      )}
      name={name}
      control={control}
    />
  );
}

export default AppInput;
