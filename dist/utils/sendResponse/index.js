"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-any
// tslint:disable:no-magic-numbers
var boolean_1 = __importDefault(require("boolean"));
var http_status_codes_1 = require("http-status-codes");
var mapObjIndexed_1 = __importDefault(require("ramda/src/mapObjIndexed"));
var defaultConfig = {
    dataKeyName: 'data',
    envelopeParamName: 'envelope',
    prettyParamName: 'pretty',
};
exports.sendEnvelopedResponse = function (_a) {
    var _b = _a.config, config = _b === void 0 ? defaultConfig : _b, headers = _a.headers, req = _a.req, res = _a.res, responseObject = _a.responseObject, status = _a.status;
    /* credits: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#envelope */
    res.status(http_status_codes_1.OK);
    var combinedHeaders = __assign({}, res.getHeaders(), headers);
    var response = responseObject !== undefined ? responseObject : {};
    var data = {
        headers: combinedHeaders,
        response: response,
        status: status,
    };
    /* credits: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#pretty */
    if (req.query[config.prettyParamName] === 'false') {
        return res.json(data);
    }
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(data, null, 2));
};
exports.sendNormalResponse = function (_a) {
    var _b = _a.config, config = _b === void 0 ? defaultConfig : _b, headers = _a.headers, req = _a.req, res = _a.res, responseObject = _a.responseObject, status = _a.status;
    res.status(status);
    if (headers !== undefined) {
        mapObjIndexed_1.default(function (value, key) {
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
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(responseObject, null, 2));
};
var sendResponse = function (_a) {
    var _b = _a.config, config = _b === void 0 ? defaultConfig : _b, rest = __rest(_a, ["config"]);
    return boolean_1.default(rest.req.query[config.envelopeParamName])
        ? exports.sendEnvelopedResponse(__assign({}, rest, { config: config }))
        : exports.sendNormalResponse(__assign({}, rest, { config: config }));
};
exports.default = sendResponse;
//# sourceMappingURL=index.js.map