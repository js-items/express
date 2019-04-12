import { Item } from "@js-items/foundation";
import { Request, Response } from 'express';

export interface Opts {
  readonly req: Request;
  readonly res: Response;
  // tslint:disable-next-line:no-any
  readonly document: any;
}

type CreatePatch<I extends Item> = (opts: Opts) => Partial<I>;

export default CreatePatch;