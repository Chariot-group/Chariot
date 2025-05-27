# 📚 Documentation - Gestion des droits et `IsCreatorGuard`

## 🔐 Authentification & Access Token

### 1. Récupération du token

Lorsqu’un utilisateur se connecte via :

```json
POST /auth/login
```

Un **JWT (JSON Web Token)** est généré et renvoyé dans la réponse :

```json
{
    "message": "User logged in 1ms",
    "access_token": {JWT}
}
```

Ce token contient l’identifiant de l’utilisateur (`userId`) et est utilisé pour authentifier les requêtes futures.

---

### 2. Utilisation dans Postman

Pour tester une route protégée avec **Postman**, il faut :

- Aller dans l'onglet **"Headers"**
- Ajouter un header :

```
Key: Cookie
Value: accessToken=<JWT>
```

#### Exemple :

```
Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🛡️ Vérification des droits : `IsCreatorGuard`

Le **`IsCreatorGuard`** est un guard personnalisé qui vérifie que l’utilisateur connecté est **le créateur d’une ressource**.

### 🧠 Fonctionnement

- Le paramètre `:id` est extrait de la route (`@Param('id')`).
- Le service injecté via `@IsCreator(Service)` doit exposer une méthode `findOne(id)` retournant un objet avec une propriété `creatorId`.
- Le guard compare `creatorId` avec `request.user.userId`.

---

### ✅ Exemple d'utilisation

#### Étape 1 : Activer le guard globalement dans le contrôleur

Dans le contrôleur, ajoutez :

```ts
@UseGuards(IsCreatorGuard)
@Controller('groups')
export class GroupController {
  ...
}
```

#### Étape 2 : Protéger une méthode

Ajoutez `@IsCreator(GroupService)` sur chaque méthode qui utilise `:id` :

```ts
@IsCreator(GroupService)
@Get(':id')
findOne(@Param('id') id: string) {
  return this.groupService.findOne(id);
}

@IsCreator(GroupService)
@Patch(':id')
update(@Param('id') id: string, @Body() dto: UpdateGroupDto) {
  return this.groupService.update(id, dto);
}
```

---

### 🔁 Conditions nécessaires

- Le service utilisé doit avoir une méthode `findOne(id: string)` retournant un objet `{ creatorId: string }`.
- Le paramètre `id` doit être présent dans la route.
- L’utilisateur doit être connecté (token JWT valide dans les cookies).

---

## 🧪 Résumé rapide

| Élément                      | Description                                                           |
| ---------------------------- | --------------------------------------------------------------------- |
| `accessToken`                | JWT stocké dans les cookies après login                               |
| `@UseGuards(IsCreatorGuard)` | Active le guard sur toutes les routes du contrôleur                   |
| `@IsCreator(Service)`        | Vérifie que l’utilisateur est bien le créateur de la ressource ciblée |
| Méthode de service requise   | `findOne(id: string): Promise<{ creatorId: string }>`                 |
