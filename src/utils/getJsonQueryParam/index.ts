
import Query from '../../types/Query';
import parseJson from '../parseJson';

export default (data: Query, paramName: string) => {
  const paramValue = data[paramName];

  return paramValue === undefined ? {} : parseJson(paramValue, [paramName]);
};