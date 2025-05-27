# Chariot

Bienvenue sur le projet **Chariot**.

## 🚀 Lancement du projet

Voici les étapes pour lancer l'application en local :

### 1. Configuration des fichiers `.env`

Cloner le fichier `.env.example` en `.env` dans les trois répertoires suivants :

- à la racine du projet
- dans le dossier `frontend`
- dans le dossier `backend`

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### 2. Installation des dépendances

Installer les dépendances nécessaires dans le frontend et le backend :

```bash
cd frontend && npm install
cd ../backend && npm install
```

### 3. Lancer le projet avec Docker

Assurez-vous d’avoir Docker installé sur votre machine.

Pour lancer l’ensemble des services (frontend, backend, base de données...) :

```bash
docker compose up
```

## 🌱 Seeder (optionnel)

Un système de **seeder** a été mis en place pour injecter des données de test dans la base de données.

- Pour exécuter le seeder :

  ```bash
  docker compose exec backend npm run seed
  ```

- Pour effacer les données existantes et reseeder proprement :

  ```bash
  docker compose exec backend npm run seed:clean
  ```
