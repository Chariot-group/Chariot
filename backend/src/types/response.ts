export default interface IResponse {
    message: string,
    data: any,
    errors: IError[]
}

export interface IError {
    code: string,
    type: "critique" | "info" | "warning"
}