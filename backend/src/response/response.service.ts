import { Injectable } from '@nestjs/common';
import IResponse, { IError } from 'src/types/response';

@Injectable()
export class ResponseService {


    static sendResponse(message: string, data: any = {}, errors: IError[]): IResponse{
        return {
            message: message,
            data: data,
            errors: errors
        }
    }

    static setError(code: string, type: "critique" | "info" | "warning"): IError{
        return {
            code: code,
            type: type
        }
    }

}
