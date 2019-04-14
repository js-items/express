// tslint:disable:no-any
import _mapObjIndexed from 'ramda/src/mapObjIndexed';

export interface Options {
  readonly url: string;
  readonly params?: { [paramName: string]: any };
}

const createTestUrl = ({ params = {}, url }: Options) =>
  Object.keys(params).reduce((acc, next) => {
    if (acc.indexOf('?') === -1) {
      return `${acc}?${next}=${params[next]}`;
    }

    return `${acc}&${next}=${params[next]}`;
  }, url);

export default createTestUrl;
