"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
let MessageService = class MessageService {
    constructor() {
        this.errors = [
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
                message: "Erreur lors de la récupération de la campagne #${?}: L'id n'est pas un id valide pour mongoose"
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
    }
    getErrorMessage(code, params) {
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
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)()
], MessageService);
//# sourceMappingURL=message.service.js.map