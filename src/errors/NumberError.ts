// tslint:disable:no-any
import { BaseError } from 'make-error';

export default class NumberError extends BaseError {

  public data: any;
  public path: string[];

  constructor(data: any, path: string[]) {
    super();
    this.data = data;
    this.path = path;
  }
}