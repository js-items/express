import { Request, Response } from 'express';
export interface Options {
    readonly req: Request;
    readonly res: Response;
    readonly err: any;
    readonly transactionId: string;
}
declare type ErrorHandler = (options: Options) => void;
export default ErrorHandler;
