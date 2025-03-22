import React from 'react';
import { Slider, Typography, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface SliderInputProps {
  name: string;
  label: string;
  min: number;
  max: number;
  step?: number;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  name,
  label,
  min,
  max,
  step = 1,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={min}
      render={({ field }) => (
        <div>
          <Typography gutterBottom>{label}</Typography>
          <Slider
            {...field}
            valueLabelDisplay="auto"
            min={min}
            max={max}
            step={step}
            onChange={(_, value) => field.onChange(value)}
          />
          {errors[name] && (
            <FormHelperText error>
              {errors[name]?.message as string}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
};
