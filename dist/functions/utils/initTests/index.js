"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sourceMapSupport = __importStar(require("source-map-support"));
var constants_1 = require("../../../constants");
sourceMapSupport.install();
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var supertest_1 = __importDefault(require("supertest"));
var factory_1 = __importDefault(require("../../../factory"));
exports.default = (function (factoryOptions) {
    var app = express_1.default();
    app.use(constants_1.TEST_URL, factory_1.default(factoryOptions));
    var request = supertest_1.default(app);
    return { request: request };
});
//# sourceMappingURL=index.js.map