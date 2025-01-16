import { useForm } from 'react-hook-form';
import ConsoleLayout from '@/components/layouts/ConsoleLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().min(1, 'Email requis').email("L'email est invalide"),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  country: z.string().min(1, 'Pays requis'),
});

type FormInputs = z.infer<typeof formSchema>;

export default function FormRHF() {
  const [result, setResult] = useState<FormInputs | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
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
            // required: 'Email requis',
            // minLength: {
            //   value: 2,
            //   message: "L'email est invalide",
            // },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label htmlFor="password">Mot de passe:</label>
        <input type="password" id="password" {...register('password')} />
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
          <option value="tunisie">Tunisie</option>
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
