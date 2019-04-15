"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parseJson_1 = __importDefault(require("../parseJson"));
exports.default = (function (data, paramName) {
    var paramValue = data[paramName];
    return paramValue === undefined ? {} : parseJson_1.default(paramValue, [paramName]);
});
//# sourceMappingURL=index.js.map