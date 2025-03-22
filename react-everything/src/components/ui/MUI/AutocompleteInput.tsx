import React from 'react';
import { Autocomplete, TextField, AutocompleteProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface AutocompleteInputProps
  extends Omit<
    AutocompleteProps<any, boolean, boolean, boolean>,
    'renderInput' | 'onChange' | 'value'
  > {
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
  multiple?: boolean;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  name,
  label,
  options,
  multiple,
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
      defaultValue={multiple ? [] : null}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={options}
          multiple={multiple}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(_, data) => field.onChange(data)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              error={!!errors[name]}
              helperText={errors[name]?.message as string}
            />
          )}
          {...rest}
        />
      )}
    />
  );
};
