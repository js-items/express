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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var foundation_1 = require("@js-items/foundation");
var http_status_codes_1 = require("http-status-codes");
var JsonError_1 = __importDefault(require("../../errors/JsonError"));
var NumberError_1 = __importDefault(require("../../errors/NumberError"));
var sendResponse_1 = __importDefault(require("../sendResponse"));
var handleError = function (_a) {
    var req = _a.req, res = _a.res, err = _a.err, transactionId = _a.transactionId;
    var sendErrorResponse = function (statusCode, errorData) {
        var data = __assign({}, errorData, { transactionId: transactionId });
        sendResponse_1.default({
            body: data,
            req: req,
            res: res,
            status: statusCode,
        });
    };
    if (err instanceof foundation_1.ConflictingItemError) {
        sendErrorResponse(http_status_codes_1.CONFLICT, {
            itemId: err.itemId,
            itemName: err.itemName,
        });
        return;
    }
    if (err instanceof foundation_1.ItemNotFoundError) {
        sendErrorResponse(http_status_codes_1.NOT_FOUND, {
            itemId: err.itemId,
            itemName: err.itemName,
        });
        return;
    }
    if (err instanceof JsonError_1.default) {
        sendErrorResponse(http_status_codes_1.BAD_REQUEST, {
            data: err.data,
            path: err.path,
        });
        return;
    }
    if (err instanceof NumberError_1.default) {
        sendErrorResponse(http_status_codes_1.BAD_REQUEST, {
            data: err.data,
            path: err.path,
        });
        return;
    }
    sendErrorResponse(http_status_codes_1.INTERNAL_SERVER_ERROR, {});
};
exports.default = handleError;
//# sourceMappingURL=index.js.map