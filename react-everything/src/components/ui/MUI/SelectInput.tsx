import React from 'react';
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  FormHelperText,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface SelectInputProps extends Omit<SelectProps, 'name'> {
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  options,
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
        <FormControl fullWidth error={!!errors[name]}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} {...rest}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors[name] && (
            <FormHelperText>{errors[name]?.message as string}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
