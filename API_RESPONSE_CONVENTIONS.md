# Conventions de Réponse API

## Structure Générale
Toutes les réponses de l'API doivent suivre une structure cohérente pour assurer clarté et uniformité dans l'application.

```json
{
  "message": "Message descriptif",
  "data": { ... } | [ ... ] | null,
  "errors": [
    {
      "code": "CODE_ERREUR_INTERNE",
      "type": "critique | informatif | warning"
    }
  ]
}
```

## Composants de la Réponse

### Codes de Statut HTTP
- Utiliser le code de statut HTTP le plus approprié pour chaque réponse.
- Exemples :
  - `200 OK` : Requête réussie.
  - `201 Created` : Ressource créée avec succès.
  - `400 Bad Request` : Erreur côté client (entrée invalide, paramètres manquants, etc.).
  - `401 Unauthorized` : Échec d'authentification.
  - `403 Forbidden` : Accès refusé.
  - `404 Not Found` : Ressource non trouvée.
  - `500 Internal Server Error` : Erreur inattendue côté serveur.

### Message
- Un message clair et lisible en anglais décrivant le résultat.
- Exemples :
  - `"Campaigns recovered successfully."`
  - `"User authentication failed."`
  - `"Invalid query parameters."`

### Données
- Doit contenir la ressource demandée (objet ou liste).
- Si aucune donnée n'est retournée, mettre un object vide `{}`.

### Erreurs
- Toujours sous forme de liste.
- Contient :
  - `code` : Code d'erreur interne spécifié dans les tickets pour faciliter la traduction des messages utilisateur. Ces codes sont stockés dans les fichiers de langue.
  - `type` : Une classification de l'erreur (`critique`, `informatif`, `warning`). Permet d'afficher l'erreur à l'utilisateur avec le bon code couleur.

## Exemples de Réponses

### Réponse Réussie (Récupération de Données)
```json
{
  "message": "Campaigns recovered successfully.",
  "data": [
    { "id": 1, "name": "Campagne A" },
    { "id": 2, "name": "Campagne B" }
  ],
  "errors": []
}
```

### Réponse Réussie (Création d'une Ressource)
```json
{
  "message": "Utilisateur créé avec succès.",
  "data": { "id": 123, "username": "johndoe" },
  "errors": []
}
```

### Réponse d'Erreur (Erreur de Validation)
```json
{
  "message": "Invalid query parameters.",
  "data": null,
  "errors": [
    {
      "code": "ENTREE_INVALIDE",
      "type": "critique"
    }
  ]
}
```

### Réponse d'Erreur (Échec d'Authentification)
```json
{
  "message": "User authentication failed.",
  "data": null,
  "errors": [
    {
      "code": "IDENTIFIANTS_INVALIDES",
      "type": "critique"
    }
  ]
}
```
