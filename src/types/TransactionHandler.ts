import { Request, Response } from 'express';

export interface Options {
  readonly req: Request;
  readonly res: Response;
}

export interface HandlerOptions {
  readonly transactionId: string;
}

export type Handler = (options: HandlerOptions) => Promise<void>;

type TransactionHandler = (options: Options, handler: Handler) => Promise<void>;

export default TransactionHandler;