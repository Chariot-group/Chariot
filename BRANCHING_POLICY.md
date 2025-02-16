# 🚀 Politique de gestion des branches

Cette politique définit les règles de gestion des branches dans le projet **Chariot** afin d'assurer un développement structuré, stable et collaboratif.

## 🌱 Branches principales

### `main` (Production)  
🔒 **Branche protégée**  
- Contient uniquement le code stable et prêt pour la mise en production.  
- Ne doit être mise à jour que via des **merge requests (MR)** depuis `integ`.  
- Chaque merge doit être validé par une revue de code et passer tous les tests.  

### `integ` (Intégration & Préproduction)  
🔒 **Branche protégée**  
- Reçoit les **merge requests** de `develop`.  
- Permet de tester et valider les nouvelles fonctionnalités avant de passer en production.  
- Cette branche doit toujours être en état fonctionnel et stable.  

### `develop` (Développement)  
🛠️ **Branche principale de développement**  
- Contient le dernier état du développement en cours.  
- Reçoit les **merge requests** des branches d'issues.  
- Peut être instable mais doit toujours être en état de fonctionnement.  

## 🔀 Branches temporaires

### 🏷️ Branches d'issues (`type/xxx-nom-issue`)  
Chaque **issue** (nouvelle fonctionnalité, bugfix, amélioration UI, refactorisation...) doit être développée dans une branche dédiée.  

#### **Format des noms de branches :**  

type/xxx-nom-issue

- `type` : catégorie de la modification parmi :
  - `feat` → Nouvelle fonctionnalité  
  - `fix` → Correction de bug  
  - `ui` → Modification UI/UX  
  - `refactor` → Refactorisation du code  
  - `docs` → Documentation  
  - `test` → Ajout/modification de tests  
  - `chore` → Maintenance (dépendances, configurations...)  
- `xxx` : numéro de l’issue GitHub/GitLab.  
- `nom-issue` : description courte en **kebab-case**.  

🔹 **Exemples :**  
```bash
git checkout -b feat/123-ajout-bouton-login
git checkout -b fix/456-correction-affichage-navbar
git checkout -b ui/789-changement-couleurs-theme
git checkout -b refactor/321-optimisation-api-calls
```

### 🔁 Processus de merge
	
1.	Création d’une branche issue (type/xxx-nom-issue) à partir de develop.

2.	Développement + commits réguliers en respectant la convention (feat:, fix:, ui:, etc.).
	
3.	Pull request (PR) vers develop avec une description claire et une référence à l’issue.
	
4.	Code review + validation des tests.
	
5.	Merge dans develop.
	
6.	Tests et validation dans integ.
	
7.	Merge dans main après validation en préproduction.

### ⛔ Règles à respecter

•	Pas de commits directs sur main, integ ou develop.

•	Une branche = une seule feature/fix.

•	Chaque PR doit être liée à une issue et doit contenir une description claire.
	
•	Rebase régulier de votre branche sur develop pour éviter les conflits.

```bash
git checkout develop

git pull origin develop

git checkout feat/123-ajout-bouton-login

git rebase develop
```

•	Suppression des branches issues une fois mergées pour garder le repo propre.