import { useState } from 'react';
import ConsoleLayout from '../layouts/ConsoleLayout';

const checkPassword = (password: string) => {
  return password.length > 8;
};

const checkEmail = (name: string) => {
  return name.length > 1;
};

export default function FormBasic() {
  const [result, setResult] = useState<object | null>(null);
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('turquie');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors: Record<string, string> = {};

    // Gestion des erreurs / validation
    if (!checkPassword(password)) {
      errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (!checkEmail(email)) {
      errors.email = "L'email est invalide";
    }

    if (Object.keys(errors).length === 0) {
      // Validation
      setResult({ email, password, country });
    } else {
      setErrors(errors);
    }
  };

  return (
    <ConsoleLayout result={result}>
      <h1>Formulaire défault React</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          // Gestion du state
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Affichage des erreurs */}
        {errors?.email && <p className="text-red-500">{errors.email}</p>}

        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="pwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors?.password && <p className="text-red-500">{errors.password}</p>}
        <label htmlFor="country">Pays préféré:</label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          <option value="">Sélectionnez un pays</option>
          <option value="france">France</option>
          <option value="turquie">Turquie</option>
          <option value="algerie">Algérie</option>
          <option value="maroc">Maroc</option>
          <option value="autre">Autre</option>
        </select>

        <button type="submit">Valider</button>
      </form>
    </ConsoleLayout>
  );
}
