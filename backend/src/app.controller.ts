import { Logger, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger
  ) {}

  readonly SERVICE = AppController.name;

  @Get()
  getHello(): string {
    this.logger.log("Lancement du serveur 'info'", this.SERVICE);
    this.logger.debug("Lancement du serveur 'info'", this.SERVICE);
    this.logger.error("Lancement du serveur 'info'", this.SERVICE);
    this.logger.fatal("Lancement du serveur 'info'", this.SERVICE);
    this.logger.verbose("Lancement du serveur 'info'", this.SERVICE);
    this.logger.warn("Lancement du serveur 'info'", this.SERVICE);
    return this.appService.getHello();
  }
}
