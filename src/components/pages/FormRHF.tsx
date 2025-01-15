import { useForm } from 'react-hook-form';
import ConsoleLayout from '../layouts/ConsoleLayout';
import { useState } from 'react';

type FormInputs = {
  email: string;
  password: string;
  country: string;
};

export default function FormRHF() {
  const [result, setResult] = useState<FormInputs | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      country: 'turquie',
    },
  });

  const onSubmit = (data: FormInputs) => {
    setResult(data);
  };

  return (
    <ConsoleLayout result={result}>
      <h1>Formulaire React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email requis',
            minLength: {
              value: 2,
              message: "L'email est invalide",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'Mot de passe requis',
            minLength: {
              value: 8,
              message: 'Le mot de passe doit contenir au moins 8 caractères',
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <label htmlFor="country">Pays préféré:</label>
        <select
          id="country"
          {...register('country', { required: 'Pays requis' })}
        >
          <option value="">Sélectionnez un pays</option>
          <option value="france">France</option>
          <option value="turquie">Turquie</option>
          <option value="algerie">Algérie</option>
          <option value="maroc">Maroc</option>
          <option value="autre">Autre</option>
        </select>
        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}

        <button type="submit">Valider</button>
      </form>
    </ConsoleLayout>
  );
}
