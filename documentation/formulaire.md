# Formulaires React - Les bases

## 1. Contrôler les inputs

- Chaque input doit être "contrôlé" avec :

```jsx
  const [email, setEmail] = useState('')
  
  <input 
    value={email} 
    onChange={(e) => setEmail(e.target.value)}
  />
```

- C'est le principe de "single source of truth"
- Le state React contrôle ce qui est affiché

## 2. Gérer la soumission

- Capturer l'événement submit du form

```jsx
  const handleSubmit = (e) => {
    e.preventDefault() // Important !
    // Traitement des données
  }

  <form onSubmit={handleSubmit}>
```

- Récupérer toutes les valeurs
- Faire les vérifications nécessaires

## 3. Valider les données

- Vérifier que les champs requis sont remplis
- Valider le format (email, téléphone, etc.)
- Afficher les erreurs

```jsx
  const [errors, setErrors] = useState({})
  
  {errors.email && <p className="error">{errors.email}</p>}
```

## 4. Retour utilisateur

- Afficher les erreurs de validation
- Indiquer le succès/échec de soumission
- Désactiver le bouton pendant le chargement
- Vider ou rediriger après succès


## 0. Initialisation

Initialiser les valeurs par défaut des inputs, par exemple venant d'une API ou d'une base de données.

```jsx
  const [mail, setMail] = useState<FormInputs | null>("monmail@gmail.com");
```

Ou si le chargement se fait de manière asynchrone, on peut utiliser le hook `useEffect` pour initialiser les valeurs par défaut.

```jsx
  useEffect(() => {
    setMail("monmail@gmail.com");
  }, [evenementApi]);
```
