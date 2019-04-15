"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var JsonError_1 = __importDefault(require("../../errors/JsonError"));
exports.default = (function (data, path) {
    try {
        return JSON.parse(data);
    }
    catch (err) {
        if (err instanceof SyntaxError) {
            throw new JsonError_1.default(data, path);
        }
        /* istanbul ignore next */
        throw err;
    }
});
//# sourceMappingURL=index.js.map