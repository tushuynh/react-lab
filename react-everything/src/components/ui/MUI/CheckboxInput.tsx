import React from 'react';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface CheckboxInputProps {
  name: string;
  label: string;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  name,
  label,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={label}
          />
          {errors[name] && (
            <FormHelperText error>
              {errors[name]?.message as string}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};
