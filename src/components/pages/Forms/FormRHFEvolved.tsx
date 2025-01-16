import ConsoleLayout from '@/components/layouts/ConsoleLayout';
import { useState } from 'react';
import { Form } from '@/components/forms/core/Form';
import { TextInput } from '@/components/forms/base/TextInput';
import { PasswordInput } from '@/components/forms/base/PasswordInput';
import { SelectInput } from '@/components/forms/base/SelectInput';
import * as yup from 'yup';

type FormInputs = {
  email: string;
  password: string;
  country: string;
};

export const formSchema = () =>
  yup.object({
    email: yup.string().email().required().label('Email'),
    password: yup.string().min(8).required().label('Mot de passe'),
    country: yup.string().required().label('Pays préféré'),
  });

export default function FormRHF() {
  const [result, setResult] = useState<FormInputs | null>(null);

  const onSubmit = (data: FormInputs) => {
    setResult(data);
  };

  return (
    <ConsoleLayout result={result}>
      <h1>Formulaire React Hook Form Evolved</h1>
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
        schema={formSchema()}
        defaultValues={{ country: 'turquie' }}
      >
        <TextInput type="email" id="email" label="Email" />
        <PasswordInput id="password" label="Mot de passe" />
        <SelectInput
          id="country"
          label="Pays préféré"
          options={[
            { label: 'France', value: 'france' },
            { label: 'Turquie', value: 'turquie' },
            { label: 'Algérie', value: 'algerie' },
            { label: 'Tunisie', value: 'tunisie' },
            { label: 'Maroc', value: 'maroc' },
            { label: 'Vietnam', value: 'vietnam' },
            { label: 'Inde', value: 'inde' },
            { label: 'Tchad', value: 'tchad' },
            { label: 'Autre', value: 'autre' },
          ]}
        />

        <button type="submit">Valider</button>
      </Form>
    </ConsoleLayout>
  );
}
