import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface RadioInputProps {
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
}

export const RadioInput: React.FC<RadioInputProps> = ({
  name,
  label,
  options,
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
        <FormControl
          component="fieldset"
          error={!!errors[name]}
          sx={{ width: '100%' }}
        >
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup {...field} aria-label={label}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {errors[name] && (
            <FormHelperText>{errors[name]?.message as string}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
