import { Item } from '@js-items/foundation';
import { Request, Response } from 'express';
import FacadeConfig from '../FacadeConfig';

// tslint:disable-next-line:no-any
type RequestHandler = <I extends Item>(config: FacadeConfig<I>) => (req: Request, res: Response) => any;

export default RequestHandler;
