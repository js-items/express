import { BaseError } from 'make-error';
export default class NumberError extends BaseError {
    data: any;
    path: string[];
    constructor(data: any, path: string[]);
}
