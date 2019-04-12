import { Item } from "@js-items/foundation";
import { Request, Response } from "express";

export interface Options<I> {
  readonly item: I | Partial<I>;
  readonly req: Request;
  readonly res: Response;
}

// tslint:disable-next-line:no-any
type DocumentIntoItem<I extends Item> = (document: any) => I | Partial<I>;

export default DocumentIntoItem;
