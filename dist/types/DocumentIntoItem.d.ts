import { Item } from "@js-items/foundation";
import { Request, Response } from "express";
export interface Options {
    readonly document: any;
    readonly req: Request;
    readonly res: Response;
}
declare type DocumentIntoItem<I extends Item> = (options: Options) => I;
export default DocumentIntoItem;
