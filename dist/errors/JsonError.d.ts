import { BaseError } from 'make-error';
export default class JsonError extends BaseError {
    data: any;
    path: string[];
    constructor(data: any, path: string[]);
}
