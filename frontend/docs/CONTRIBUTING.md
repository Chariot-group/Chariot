# Contribuer à Chariot Front

Lorsque vous contribuez à l'application Chariot Front, ...

## Table des matières

1.  [Règles de code](#règles-de-code)
2.  [Architecture du projet](#architecture-du-projet)
3.  [Conventions de nommage](#conventions-de-nommage)

## 📚 Règles de code

### 🔗 Navigation

Même s'ils ont la même apparence visuelle :

- Chaque bouton destiné à la navigation devra utiliser la balise next-navigation `<Link></Link>`

### 🌐 Locales & traduction

Pour toute question relative à la traduction ou à l'internationalisation, veuillez consulter le fichier [i18n.md](./i18n.md) pour plus de détails sur la configuration et les bonnes pratiques.

## 🏗️ Architecture du projet

L’architecture de Chariot Front repose sur une structure modulaire centralisée.

Plutôt que d’avoir un dossier `modules` contenant tous les fichiers liés à un module donné, nous avons des dossiers thématiques globaux (`components`, `models`, `services`, `hooks`, etc.) dans lesquels les fichiers sont **regroupés par module**.

Par exemple :

```
components/
  ├── orders/
  │   ├── OrderForm.tsx
  │   └── OrderCard.tsx
  ├── users/
  │   └── UserList.tsx
```

Chaque sous-dossier correspond à un **module fonctionnel** (ex. `orders`, `users`, etc.), ce qui permet de garder une structure claire tout en mutualisant les types de fichiers.

Cette organisation s’applique à l’ensemble des dossiers suivants :

- **components/** : composants React triés par module
- **models/** : types et interfaces spécifiques à un module
- **services/** : appels API regroupés par module
- **hooks/** : hooks personnalisés, également triés par module
- **utils/** : fonctions utilitaires, triées par domaine fonctionnel si pertinent

Les fichiers ou composants vraiment globaux (utilisables dans tous les modules sans distinction) sont placés à la racine de chaque dossier, ou dans un sous-dossier `common/` selon les cas.

👉 Cette architecture permet une **lisibilité accrue** et une **facilité de navigation** sans sacrifier la séparation des responsabilités.

## 🔤 Conventions de nommage

### 🧩 Components

- Chaque composant doit être nommé en **PascalCase**, et son fichier doit suivre le même nom.
- Convention de nommage : **Module|(CRUDAction)|Specif**

_Exemple_ : **CampainIndexDatatable** ou **NPCForm**

### 🏷️ Models

- Les interfaces et types (dans leur nom et dans le nom de leur fichier) doivent toutes commencer par un **I**.

_Exemple_ :

`file: /src/modules/Campains/types/IContact.ts`

```ts
export interface ICampains {}
```

### 🏗️ Variables

- Les variables doivent être nommées en **camelCase**.
- Les constantes globales doivent être en **UPPER_CASE**.
- Les noms doivent être explicites et éviter les abréviations inutiles.

_Exemple_ :

```ts
const userName = "John Doe";
const MAX_ATTEMPTS = 5;
```
