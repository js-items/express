/// <reference types="node" />
import { Request, Response } from 'express';
import { OutgoingHttpHeaders } from 'http';
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
export declare const sendEnvelopedResponse: ({ config, headers, req, res, body, status, }: Options) => import("express-serve-static-core").Response;
export declare const sendNormalResponse: ({ config, headers, req, res, body, status, }: Options) => import("express-serve-static-core").Response;
declare const sendResponse: ({ config, ...rest }: Options) => import("express-serve-static-core").Response;
export default sendResponse;
