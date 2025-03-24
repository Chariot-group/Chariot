import { Injectable } from '@nestjs/common';
import IResponse, { IError } from 'src/types/response';

@Injectable()
export class ResponseService {

    private static readonly errors: {code: string, message: string}[] = [
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

    static getErrorMessage(code: string, params: string[]): string{
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

    static sendResponse(message: string, data: any = {}, errors: IError[]): IResponse{
        return {
            message: message,
            data: data,
            errors: errors
        }
    }

    static setError(code: string, type: "critical" | "info" | "warning"): IError{
        return {
            code: code,
            type: type
        }
    }

}
