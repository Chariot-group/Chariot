"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
const common_1 = require("@nestjs/common");
let ResponseService = class ResponseService {
    static getErrorMessage(code, params) {
        const error = this.errors.find(error => error.code === code);
        if (error) {
            let message = error.message;
            params.forEach((param, _) => {
                message = message.replace('{?}', param);
            });
            return message;
        }
        return "Erreur inconnue";
    }
    static sendResponse(message, data = {}, errors) {
        return {
            message: message,
            data: data,
            errors: errors
        };
    }
    static setError(code, type) {
        return {
            code: code,
            type: type
        };
    }
};
exports.ResponseService = ResponseService;
ResponseService.errors = [
    {
        code: "external_resource_not_find",
        message: "Impossible de trouver {?} #${?}"
    },
    {
        code: "external_resource_find",
        message: "{?} #${?} trouvé avec succès"
    },
    {
        code: "external_mongoose_id_error",
        message: "Erreur lors de la récupération de {?} #${?}: L'id n'est pas un id valide pour mongoose"
    },
    {
        code: "internal_resource_not_find",
        message: "Erreur lors de la récupération de {?} #${?}: ${?}"
    },
    {
        code: "internal_resource_find",
        message: "Erreur lors de la récupération de {?} #${?}: ${?}"
    }
];
exports.ResponseService = ResponseService = __decorate([
    (0, common_1.Injectable)()
], ResponseService);
//# sourceMappingURL=response.service.js.map