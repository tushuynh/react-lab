import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@mui/material';
import { TextInput } from './ui/MUI/TextInput';
import { SelectInput } from './ui/MUI/SelectInput';
import { AutocompleteInput } from './ui/MUI/AutocompleteInput';
import { CheckboxInput } from './ui/MUI/CheckboxInput';
import { RadioInput } from './ui/MUI/RadioInput';
import { SliderInput } from './ui/MUI/SliderInput';

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
];

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

const subscriptionOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  fruit: z.string().min(1, 'Fruit is required'),
  terms: z.boolean().refine((data) => data, {
    message: 'You must accept the terms and conditions',
  }),
  subscription: z.string().min(1, 'Subscription is required'),
});

type FormValues = z.infer<typeof formSchema>;

export const MyForm: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput name="username" label="Username" />
        <TextInput name="email" label="Email" />

        <SelectInput name="country" label="Country" options={countryOptions} />

        <AutocompleteInput name="fruit" label="Fruit" options={fruitOptions} />

        <CheckboxInput name="terms" label="I accept the terms and conditions" />

        <RadioInput
          name="subscription"
          label="Subscription Plan"
          options={subscriptionOptions}
        />

        <SliderInput
          name="satisfaction"
          label="Satisfaction Level"
          min={0}
          max={100}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: '100%' }}
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};
