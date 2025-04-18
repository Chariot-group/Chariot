# Contribuer à Chariot Back

Lorsque vous contribuez à l'application Chariot Back, ...

## Table des matières

- [Création de Ressource](#création-de-ressource)
- [Gestion des logs](#gestion-des-logs)

## Création de Ressource

### 1. Génération de la Ressource

Pour créer une nouvelle ressource dans un projet NestJS, utilisez la commande suivante :

```sh
nest generate resource resourceName
```

ou en version raccourcie :

```sh
nest g res resourceName
```

Cela générera automatiquement un ensemble de fichiers nécessaires à la gestion de cette ressource : service, controller, module, DTOs, entité et les fichiers de test.

## 2. Adaptation à MongoDB

Comme nous utilisons MongoDB avec Mongoose, nous devons adapter la structure des fichiers générés par défaut :

1. **Renommer le dossier `entities` en `schemas`** :

   ```sh
   mv src/resource-name/entities src/resource-name/schemas
   ```

2. **Renommer le fichier `resource.entity.ts` en `resource.schema.ts`** :

   ```sh
   mv src/resource-name/schemas/resource.entity.ts src/resource-name/schemas/resource.schema.ts
   ```

Il est à noter que dans une version ultérieure du projet, il pourrait être possible de faire une surcouche à la CLI de nest pour générer les schémas au lieu des entités de manière automatique.

## 3. Exemple de Schéma Mongoose pour NestJS

Voici un exemple de schéma Mongoose pour une ressource basique, telle qu'un `Product` :

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
```

Ce fichier sera enregistré sous `src/product/schemas/product.schema.ts`.

Avec cette approche, nous structurons notre projet NestJS en respectant les bonnes pratiques pour l'utilisation de MongoDB avec Mongoose sans dénaturer la structure modulaire de NestJS.

## Gestion des logs

Pour enregistrer des événements ou des messages importants, nous utilisons un logger centralisé. Cela permet de suivre les activités de l'application et de faciliter le débuggage.

Pour plus de détails sur l'utilisation et la configuration du logger, veuillez consulter la documentation dédiée : [`logger.md`](./logger.md).
