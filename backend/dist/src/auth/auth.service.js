"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.SERVICE_NAME = user_service_1.UserService.name;
        this.logger = new common_1.Logger(this.SERVICE_NAME);
    }
    async signIn(signInDto) {
        try {
            const user = await this.userService.findByEmail(signInDto.email);
            if (!user || user?.password !== signInDto.password) {
                const message = `Email or password is incorrect`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.UnauthorizedException(message);
            }
            const start = Date.now();
            const token = this.jwtService.sign({ iss: process.env.BACKEND_URL, sub: user._id, aud: process.env.FRONTEND_URL });
            const end = Date.now();
            const message = `User logged in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                access_token: token,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            const message = `Error while sign in user: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map