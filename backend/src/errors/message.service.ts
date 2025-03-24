import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {

    private readonly errors: {code: string, message: string}[] = [
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

    public getErrorMessage(code: string, params: string[]): string{
        const error = this.errors.find(error => error.code === code);
        if(error){
            let message = error.message;
            params.forEach((param, _) => {
                message = message.replace('{?}', param);
            });
            return message;
        }
        return "Erreur inconnue";
    }

}
