import JsonError from '../../errors/JsonError';

export default (data: string, path: string[]) => {
  try {
    return JSON.parse(data);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new JsonError(data, path);
    }
    /* istanbul ignore next */
    throw err;
  }
};