import { Filter, Item } from '@js-items/foundation';
import { Request, Response } from 'express';
export interface Opts<I extends Item> {
    readonly req: Request;
    readonly res: Response;
    readonly filter: Filter<I>;
}
declare type CreateFilter<I extends Item> = (opts: Opts<I>) => Filter<I>;
export default CreateFilter;
