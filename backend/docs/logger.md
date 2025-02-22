# Documentation : Utilisation du Logger Winston dans CHARIOT

## Introduction

Ce projet utilise [Winston](https://github.com/winstonjs/winston) comme logger pour assurer une gestion centralisée et flexible des logs. Winston est déjà installé et initialisé.

## Utilisation dans un Service ou un Contrôleur

Injectez le logger Winston dans n'importe quel service ou contrôleur et ajoutez un contexte pour mieux identifier l'origine des logs :

```typescript
import { Logger, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger
  ) {}

  readonly SERVICE_NAME = AppController.name;

  @Get()
  getHello(): string {
    this.logger.log("Say hello world", this.SERVICE_NAME);
    return this.appService.getHello();
  }
}
```

L'ajout du deuxième paramètre (`this.SERVICE_NAME`) permet de spécifier un contexte pour chaque log, facilitant ainsi le suivi et le débogage.

## Niveaux de Log

Winston propose plusieurs niveaux de logs par défaut :

- `error` : Erreur grave
- `warn` : Avertissement
- `info` : Information générale
- `http` : Logs HTTP
- `verbose` : Messages détaillés
- `debug` : Messages de debug
- `silly` : Messages très détaillés

## Bonnes Pratiques

- Toujours utiliser le logger au lieu de `console.log`.
- Définir des niveaux de logs appropriés pour faciliter le débogage.
- Ajouter un contexte aux logs pour identifier leur provenance.
- Ne pas loguer d’informations sensibles (ex: mots de passe, tokens).