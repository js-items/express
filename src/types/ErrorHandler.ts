import { Request, Response } from 'express';

export interface Options {
  readonly req: Request;
  readonly res: Response;
  // tslint:disable-next-line:no-any
  readonly err: any;
  readonly transactionId: string;
}

type ErrorHandler = (options: Options) => void;

export default ErrorHandler;