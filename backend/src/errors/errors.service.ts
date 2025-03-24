import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorsService {

    private readonly errors: {code: string, message: string}[] = [
        {
            code: "resource_not_find",
            message: "Impossible de trouver {?} #${?}"
        },
        {
            code: "resource_find",
            message: "{?} #${?} trouvé avec succès"
        },
        {
            code: "mongoose_id_error",
            message: "Erreur lors de la récupération de la campagne #${?}: L'id n'est pas un id valide pour mongoose"
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
