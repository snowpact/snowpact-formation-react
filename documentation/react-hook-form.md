# React Hook Form - Guide des méthodes essentielles

## 1. Register - Enregistrer les champs

Le `register` est la méthode fondamentale pour enregistrer un champ dans le formulaire. Elle gère automatiquement les événements onChange, onBlur, et la validation.

```tsx
const { register } = useForm();

// Basique
<input {...register("email")} />

// Avec validation
<input {...register("email", {
  required: "Email requis",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Email invalide"
  }
})} />
```

## 2. Watch - Observer les changements

`watch` permet d'observer les changements de valeurs en temps réel. C'est utile pour créer des champs dépendants ou pour réagir aux modifications de l'utilisateur. Attention à la performance, car watch déclenche des re-renders.

```tsx
function Form() {
  const { register, watch } = useForm();
  
  // Observer le type de livraison
  const deliveryType = watch("deliveryType");

  return (
    <form>
      <select {...register("deliveryType")}>
        <option value="home">Livraison à domicile</option>
        <option value="relay">Point relais</option>
      </select>

      {/* Champs conditionnels basés sur le type de livraison */}
      {deliveryType === "home" && (
        <div>
          <input {...register("address")} placeholder="Adresse" />
          <input {...register("zipCode")} placeholder="Code postal" />
        </div>
      )}

      {deliveryType === "relay" && (
        <select {...register("relayPoint")}>
          <option value="relay1">Point relais 1</option>
          <option value="relay2">Point relais 2</option>
        </select>
      )}
    </form>
  );
}
```

## 3. SetValue - Modifier les valeurs

`setValue` permet de modifier programmatiquement les valeurs du formulaire. C'est particulièrement utile pour les champs interdépendants ou pour pré-remplir le formulaire avec des données.

```tsx
const { setValue } = useForm();

// Exemple pratique : Mise à jour en cascade
const onCountryChange = (country: string) => {
  setValue("country", country);
  // Reset des champs dépendants
  setValue("city", "");
  setValue("zipCode", "");
};
```

## 4. SetError - Gérer les erreurs

`setError` est crucial pour la gestion des erreurs, notamment celles venant du serveur. Il permet d'afficher des erreurs qui ne sont pas liées à la validation côté client.

```tsx
const { setError } = useForm();

// Gestion des erreurs API
const onSubmit = async (data) => {
  try {
    await api.submit(data);
  } catch (error) {
    // Erreur spécifique à un champ
    setError("email", {
      type: "server",
      message: "Cet email existe déjà"
    });
    // Erreur globale
    setError("root.serverError", {
      type: "server",
      message: "Erreur serveur"
    });
  }
};
```

## 5. FormState - État du formulaire

`formState` donne accès à l'état global du formulaire. C'est essentiel pour gérer l'UI et les retours utilisateur.

```tsx
const {
  formState: { 
    isDirty,     // Le formulaire a été modifié
    isSubmitting,// Soumission en cours
    isValid,     // Tous les champs sont valides
    errors,      // Objets contenant les erreurs
    touchedFields,// Champs qui ont reçu le focus
    dirtyFields  // Champs qui ont été modifiés
  }
} = useForm();

// Utilisation pratique pour le bouton submit
<button 
  disabled={!isDirty || !isValid || isSubmitting}
>
  {isSubmitting ? "Envoi..." : "Envoyer"}
</button>
```

## 6. Resolver - Gérer les validations et erreurs

### 6.1 Validation native avec register

Sans resolver, on doit définir les règles de validation directement dans le register :

```tsx
function FormWithoutResolver() {
  const { register, handleSubmit } = useForm();

  return (
    <form>
      {/* Validation simple */}
      <input {...register("email", {
        required: "Email requis",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Email invalide"
        }
      })} />

      {/* Validation complexe */}
      <input {...register("password", {
        required: "Mot de passe requis",
        minLength: {
          value: 8,
          message: "Minimum 8 caractères"
        },
        validate: {
          hasNumber: (value) => 
            /\d/.test(value) || "Doit contenir un chiffre",
          hasUpperCase: (value) => 
            /[A-Z]/.test(value) || "Doit contenir une majuscule",
          hasSpecialChar: (value) => 
            /[!@#$%^&*]/.test(value) || "Doit contenir un caractère spécial"
        }
      })} />
    </form>
  );
}
```

### 6.2 Validation avec Zod

Avec un resolver, la validation est centralisée et plus maintenable :

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schéma de validation
const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email requis")
    .email("Format d'email invalide"),
  password: z
    .string()
    .min(8, "Minimum 8 caractères")
    .regex(/\d/, "Doit contenir un chiffre")
    .regex(/[A-Z]/, "Doit contenir une majuscule")
    .regex(/[!@#$%^&*]/, "Doit contenir un caractère spécial"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

function FormWithResolver() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema)
  });

  return (
    <form>
      {/* Plus besoin de validation dans register */}
      <input {...register("email")} />
      <input {...register("password")} />
      <input {...register("confirmPassword")} />
    </form>
  );
}
```


## Exemple complet avec cas d'usage

```tsx
import { useForm } from 'react-hook-form';

type FormInputs = {
  email: string;
  password: string;
  country: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { isDirty, isValid, errors, isSubmitting }
  } = useForm<FormInputs>();

  // Exemple de watch pour logique conditionnelle
  const country = watch("country");
  
  useEffect(() => {
    // Mise à jour automatique basée sur la sélection du pays
    if (country === "france") {
      setValue("phonePrefix", "+33");
    }
  }, [country, setValue]);

  const onSubmit = async (data: FormInputs) => {
    try {
      await api.submit(data);
    } catch (error) {
      // Gestion des erreurs API
      setError("root.serverError", {
        type: "server",
        message: "Erreur serveur"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", {
        required: "Email requis"
      })} />
      {errors.email && <p>{errors.email.message}</p>}
      
      <button disabled={!isDirty || !isValid || isSubmitting}>
        {isSubmitting ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
```