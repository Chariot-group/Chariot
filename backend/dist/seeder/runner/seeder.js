"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../../app.module");
const seeder_service_1 = require("../seeder.service");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const SERVICE_NAME = 'SEEDER';
    const start = Date.now();
    common_1.Logger.log('Creating an application context...', SERVICE_NAME);
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    common_1.Logger.log('Application context created', SERVICE_NAME);
    common_1.Logger.log('Database currently being filled', SERVICE_NAME);
    const args = process.argv.slice(2);
    const clean = args.includes('--clean');
    const seederService = app.get(seeder_service_1.SeederService);
    await seederService.seed(clean);
    const end = Date.now();
    common_1.Logger.log(`Database ready (${end - start}ms)`, SERVICE_NAME);
    await app.close();
}
bootstrap();
//# sourceMappingURL=seeder.js.map