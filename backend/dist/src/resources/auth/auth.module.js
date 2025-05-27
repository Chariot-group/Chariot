"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_module_1 = require("../user/user.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("../../common/strategies/jwt.strategy");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const mailling_module_1 = require("../../mailling/mailling.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            mailling_module_1.MaillingModule,
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            jwt_1.JwtModule.registerAsync({
                imports: [
                    mongoose_1.MongooseModule.forFeature([
                        { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                    ]),
                    config_1.ConfigModule,
                    user_module_1.UserModule
                ],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    global: true,
                    privateKey: configService.get('JWT_SECRET_KEY', 'defaultSecretKey'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRATION', '60s'),
                        algorithm: configService.get('JWT_ALGORITHM', 'HS256'),
                    },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map