import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IonInput } from '@ionic/react';

export type AppInputProps = {
  name: string;
  placeholder: string;
  inputmode: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  autoCapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words';
};

function AppInput({
  name, placeholder, inputmode, autoCapitalize,
}: AppInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <IonInput
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onIonChange={onChange}
          value={value}
          placeholder={placeholder}
          inputmode={inputmode}
          autoCapitalize={autoCapitalize}
        />
      )}
      name={name}
      control={control}
    />
  );
}

export default AppInput;
