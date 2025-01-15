import { useState } from 'react';
import ConsoleLayout from '../layouts/ConsoleLayout';

export default function FormBasic() {
    const [result, setResult] = useState<object | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setResult({ email, password, country });
  };

  return (
    <ConsoleLayout result={result}>
      <h1>Formulaire défault React</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="pwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

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

        <button type="submit">S'inscrire</button>
      </form>
    </ConsoleLayout>
  );
}