// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import boolean from 'boolean';
import { Request, Response } from 'express';
import { OutgoingHttpHeaders } from 'http';
import { OK } from 'http-status-codes';
import _mapObjIndexed from 'ramda/src/mapObjIndexed';

export interface Config {
  readonly prettyParamName: string;
  readonly envelopeParamName: string;
  readonly [key: string]: any;
}

export interface Options {
  readonly req: Request;
  readonly res: Response;
  readonly config?: Config;
  readonly status?: number;
  readonly body?: any;
  readonly headers?: OutgoingHttpHeaders;
}

const defaultConfig = {
  envelopeParamName: 'envelope',
  prettyParamName: 'pretty',
};

/* istanbul ignore next */
export const sendEnvelopedResponse = ({
  config = defaultConfig,
  headers,
  req,
  res,
  body = {},
  status = OK,
}: Options) => {
  /* credits: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#envelope */
  res.status(OK);

  const combinedHeaders = { ...res.getHeaders(), ...headers };

  const data = {
    body,
    headers: combinedHeaders,
    status,
  };

  /* credits: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#pretty */
  if (req.query[config.prettyParamName] === 'false') {
    return res.json(data);
  }

  res.setHeader('Content-Type', 'application/json');

  return res.send(JSON.stringify(data, null, 2));
};

/* istanbul ignore next */
export const sendNormalResponse = ({
  config = defaultConfig,
  headers,
  req,
  res,
  body,
  status = OK,
}: Options) => {
  res.status(status);

  if (headers !== undefined) {
    _mapObjIndexed((value, key) => {
      if (value !== undefined) {
        res.setHeader(key, value);
      }
    }, headers);
  }

  if (body === undefined) {
    return res.send();
  }

  /* credits: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#pretty */
  if (req.query[config.prettyParamName] === 'false') {
    return res.json(body);
  }

  res.setHeader('Content-Type', 'application/json');

  return res.send(JSON.stringify(body, null, 2));
};

const sendResponse = ({ config = defaultConfig, ...rest }: Options) =>
  boolean(rest.req.query[config.envelopeParamName])
    ? sendEnvelopedResponse({ ...rest, config })
    : sendNormalResponse({ ...rest, config });

export default sendResponse;
