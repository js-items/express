"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NumberError_1 = __importDefault(require("../../errors/NumberError"));
exports.default = (function (query, paramName, defaultValue) {
    var paramValue = query[paramName];
    if (paramValue === undefined) {
        return defaultValue;
    }
    var parsedParamValue = Number(paramValue);
    if (isNaN(parsedParamValue)) {
        throw new NumberError_1.default(paramValue, [paramName]);
    }
    return parsedParamValue;
});
//# sourceMappingURL=index.js.map