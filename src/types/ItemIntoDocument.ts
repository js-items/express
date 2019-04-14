import { Item } from "@js-items/foundation";
import { Request, Response } from "express";

export interface Options<I> {
  readonly item: I;
  readonly req: Request;
  readonly res: Response;
}

// tslint:disable-next-line:no-any
type ItemIntoDocument<I extends Item> = (options: Options<I>) => any;

export default ItemIntoDocument;
