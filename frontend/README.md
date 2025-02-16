# Contribuer à Chariot Front

Lorsque vous contribuez à l'application Chariot Front, ...

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Table des matières

1.  [Règles de code](#règles-de-code)
2.  [Architecture du projet](#architecture-du-projet)
3.  [Conventions de nommage](#conventions-de-nommage)

## 📚 Règles de code

### 🔗 Navigation

Même s'ils ont la même apparence visuelle :

- Chaque bouton destiné à la navigation devra utiliser la balise next-navigation ```<Link></Link>```

### 🌐 Locales & traduction

Voir les modules de traduction react et insérer ici les usages.

## 🏗️ Architecture du projet
  
L'architecture du projet Next est orientée module : on peut retrouver un dossier module dans lequel sont définis tous les modules de l'application.

Un module possède son dossier propre dès qu'il contient des opérations **CRUD**. Cette distinction permet le fait de définir un sous-module.

Chaque module **présent dans le dossier du même nom** possède les types de dossiers suivants :

- 🧩 components : Ce dossier contient les components qui ne seront utilisés que dans le module en question (il convient de déplacer dans le dossier `common` tout composant dont la portée serait jugée utile au global).

- ⚙️ services : L'appellation service dans le front correspond aux appels à l'API.

- 🏷️ models : Ce dossier contient toutes les définitions d'interfaces ou de types utiles à l'intérieur du module (il convient de déplacer dans le dossier global tout type dont la portée serait jugée plus grande que celle du module).

- 🪝 hooks : Ce dossier contient les hooks du module (il convient de déplacer dans le dossier global tout hook dont la portée serait jugée plus grande que celle du module).

- etc...

Les fichiers qui ne sont spécifiques à aucun module ou qui sont utilisés par plusieurs modules à la fois doivent être placés dans le dossier `common`, ce dossier contient la même architecture que les modules classiques à quelques exceptions près :

🧩 components : Les **composants** du dossier **common** sont divisés en 4 catégories :

-  **ui** : Pour les composants shadcn tels que les boutons, les cards, les menus...
-  **base** : Pour les composants simples ne venant pas de shadcn...
-  **advanced** : Pour les composants plus complexes, ultra paramétriques et au cœur de chaque module : Paginator, Datatable...
-  **layout** : Pour les composants utilisés dans l'affichage global de l'application (Header, Sidebar...)

🧬 config : Tous les fichiers nécessaires à la configuration du projet doivent se trouver dans ce dossier.

## 🔤 Conventions de nommage

### 🧩 Components

- Chaque composant doit être nommé en **PascalCase**, et son fichier doit suivre le même nom.
- Convention de nommage : **Module|(CRUDAction)|Specif**

_Exemple_ : **CampainIndexDatatable** ou **NPCForm**

### 🏷️ Models

- Les interfaces et types (dans leur nom et dans le nom de leur fichier) doivent toutes commencer par un **I**.

_Exemple_ :

```file: /src/modules/Campains/types/IContact.ts```

```ts
export interface ICampains {
}
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

