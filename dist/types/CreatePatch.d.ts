import { Item } from "@js-items/foundation";
import { Request, Response } from 'express';
export interface Opts {
    readonly req: Request;
    readonly res: Response;
    readonly document: any;
}
declare type CreatePatch<I extends Item> = (opts: Opts) => Partial<I>;
export default CreatePatch;
