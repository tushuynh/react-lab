import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface TextInputProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  label: string;
  className?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  className,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          fullWidth
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
          className={` mb-4 ${className}`}
          {...rest}
        />
      )}
    />
  );
};
