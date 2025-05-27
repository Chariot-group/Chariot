import IResponse, { IError } from 'src/types/response';
export declare class ResponseService {
    private static readonly errors;
    static getErrorMessage(code: string, params: string[]): string;
    static sendResponse(message: string, data: any, errors: IError[]): IResponse;
    static setError(code: string, type: "critical" | "info" | "warning"): IError;
}
