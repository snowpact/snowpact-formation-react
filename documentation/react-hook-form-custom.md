## Création des composants personnalisés 

Exemple concret avec un composant de date personnalisé utilisant `useController`.

2 choses de bases : 

1. Initialiser 

```tsx
import { useForm, useController, Control } from 'react-hook-form';
import DatePicker from 'react-datepicker'; // ou autre lib de date
import 'react-datepicker/dist/react-datepicker.css';

interface DateInputProps {
  name: string;
  control: Control<any>;
  label: string;
}

// Composant DateInput réutilisable
function DateInput({ name, control, label }: DateInputProps) {
  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: { required: 'Date requise' },
    defaultValue: null,
  });

  return (
    <div>
      <label>{label}</label>
      <DatePicker
        selected={value}
        onChange={(date: Date) => onChange(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Sélectionnez une date"
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}

// Utilisation dans un formulaire
function Form() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      birthDate: null,
      startDate: new Date(),
    }
  });

  const onSubmit = (data) => {
    console.log('Dates:', {
      birthDate: data.birthDate,
      startDate: data.startDate,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DateInput
        name="birthDate"
        control={control}
        label="Date de naissance"
      />
      <DateInput
        name="startDate"
        control={control}
        label="Date de début"
      />
      <button type="submit">Valider</button>
    </form>
  );
}
```