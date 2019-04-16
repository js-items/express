// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import boolean from 'boolean';
import { Request, Response } from 'express';
import { OutgoingHttpHeaders } from 'http';
import { OK } from 'http-status-codes';
import _mapObjIndexed from 'ramda/src/mapObjIndexed';

export interface Config {
  readonly dataKeyName: string;
  readonly prettyParamName: string;
  readonly envelopeParamName: string;
  readonly [key: string]: any;
}

export interface Options {
  readonly req: Request;
  readonly res: Response;
  readonly config?: Config;
  readonly status: number;
  readonly responseObject?: any;
  readonly headers?: OutgoingHttpHeaders;
}

const defaultConfig = {
  dataKeyName: 'data',
  envelopeParamName: 'envelope',
  prettyParamName: 'pretty',
};

export const sendEnvelopedResponse = ({
  config = defaultConfig,
  headers,
  req,
  res,
  responseObject,
  status,
}: Options) => {
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
  if (req.query[config.prettyParamName] === 'false') {
    return res.json(data);
  }
  
  res.setHeader('Content-Type','application/json');

  return res.send(JSON.stringify(data, null, 2));
};

export const sendNormalResponse = ({
  config = defaultConfig,
  headers,
  req,
  res,
  responseObject,
  status,
}: Options) => {
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
  if (req.query[config.prettyParamName] === 'false') {
    return res.json(responseObject);
  }

  res.setHeader('Content-Type','application/json');

  return res.send(JSON.stringify(responseObject, null, 2));
};

const sendResponse = ({ config = defaultConfig, ...rest }: Options) =>
  boolean(rest.req.query[config.envelopeParamName])
    ? sendEnvelopedResponse({ ...rest, config })
    : sendNormalResponse({ ...rest, config });

export default sendResponse;
