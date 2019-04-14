import { Item } from "@js-items/foundation";
import { Request, Response } from "express";

export interface Options {
  // tslint:disable-next-line:no-any
  readonly document: any;
  readonly req: Request;
  readonly res: Response;
}

// tslint:disable-next-line:no-any
type DocumentIntoItem<I extends Item> = (options: Options) => I;

export default DocumentIntoItem;
