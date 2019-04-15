import { Item } from '@js-items/foundation';
import { Request, Response } from 'express';
import FacadeConfig from '../FacadeConfig';
declare type RequestHandler = <I extends Item>(config: FacadeConfig<I>) => (req: Request, res: Response) => any;
export default RequestHandler;
