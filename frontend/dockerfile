# Utiliser l'image officielle de Node.js
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances, y compris ts-node
RUN npm install

# Copier tout le code source
COPY . .

# Exposer le port pour l'application Next.js
EXPOSE ${FRONT_PORT}

# Lancer la commande pour démarrer le frontend (générer les locales et démarrer next dev)
CMD ["npm", "run", "dev"]
