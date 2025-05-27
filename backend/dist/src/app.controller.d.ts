import { Logger } from '@nestjs/common';
import { AppService } from '@/app.service';
export declare class AppController {
    private readonly appService;
    private readonly logger;
    constructor(appService: AppService, logger: Logger);
    readonly SERVICE: string;
    getHello(): string;
}
