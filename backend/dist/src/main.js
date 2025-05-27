"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const nest_winston_1 = require("nest-winston");
const winston_logger_1 = require("./logger/winston.logger");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger({
            instance: winston_logger_1.instance,
        }),
    });
    app.use(cookieParser());
    app.enableCors({
        origin: `${process.env.FRONTEND_URL}`,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const reflector = app.get(core_1.Reflector);
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(reflector));
    await app.listen(9000);
    console.log('Chariot API running on port:', process.env.API_PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map