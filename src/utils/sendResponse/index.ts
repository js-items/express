// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { Item } from '@js-items/foundation';
import boolean from 'boolean';
import { Request, Response } from 'express';
import { OutgoingHttpHeaders } from 'http';
import { OK } from 'http-status-codes';
import _mapObjIndexed from 'ramda/src/mapObjIndexed';
import FacadeConfig from '../../FacadeConfig';

export interface Options<I extends Item> {
  readonly req: Request;
  readonly res: Response;
  readonly config: FacadeConfig<I>;
  readonly status: number;
  readonly responseObject?: any;
  readonly headers?: OutgoingHttpHeaders;
}

export const sendEnvelopedResponse = <I extends Item>({
  config,
  headers,
  req,
  res,
  responseObject,
  status,
}: Options<I>) => {
  /* credits: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#envelope */
  res.status(OK);

  const combinedHeaders = { ...res.getHeaders(), ...headers };

  const response = responseObject !== undefined ? responseObject : {};

  const data = {
    headers: combinedHeaders,
    response,
    status,
  };

  /* credits: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#pretty */
  if (!boolean(req.params[config.prettyParamName])) {
    return res.json(responseObject);
  }

  return res.json(JSON.stringify(responseObject, null, 2));
};

export const sendNormalResponse = <I extends Item>({
  config,
  headers,
  req,
  res,
  responseObject,
  status,
}: Options<I>) => {
  res.status(status);

  if (headers !== undefined) {
    _mapObjIndexed((value, key) => {
      if (value !== undefined) {
        res.setHeader(key, value);
      }
    }, headers);
  }

  if (responseObject === undefined) {
    return res.send();
  }

  /* credits: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#pretty */
  if (!boolean(req.params[config.prettyParamName])) {
    return res.json(responseObject);
  }

  return res.json(JSON.stringify(responseObject, null, 2));
};

const sendResponse = <I extends Item>(options: Options<I>) =>
  boolean(options.req.params[options.config.envelopeParamName])
    ? sendEnvelopedResponse(options)
    : sendNormalResponse(options);

export default sendResponse;
