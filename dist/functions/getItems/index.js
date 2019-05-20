"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var boolean_1 = __importDefault(require("boolean"));
var http_status_codes_1 = require("http-status-codes");
var defaultTo_1 = __importDefault(require("ramda/src/defaultTo"));
var isNil_1 = __importDefault(require("ramda/src/isNil"));
var getJsonQueryParam_1 = __importDefault(require("../../utils/getJsonQueryParam"));
var getNumberQueryParam_1 = __importDefault(require("../../utils/getNumberQueryParam"));
var sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
var getItems = function (config) { return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var transactionHandler;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transactionHandler = defaultTo_1.default(config.defaultTransactionHandler)(config.beforeGetItems);
                return [4 /*yield*/, transactionHandler({ req: req, res: res }, function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, _c, filter, sort, limit, createdFilter, _d, cursor, items, totalCount, responseHeaders, responseData, nestedObject, enveloped, responseObject, headers;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    filter = getJsonQueryParam_1.default(req.query, 'filter');
                                    sort = !isNil_1.default(req.query.sort)
                                        ? getJsonQueryParam_1.default(req.query, 'sort')
                                        : config.defaultSort;
                                    limit = getNumberQueryParam_1.default(req.query, 'limit', config.defaultPaginationLimit);
                                    createdFilter = config.createFilter({ filter: filter, req: req, res: res });
                                    return [4 /*yield*/, config.service.getItems({
                                            filter: createdFilter,
                                            pagination: {
                                                after: req.query.after,
                                                before: req.query.before,
                                                limit: limit,
                                            },
                                            sort: sort,
                                        })];
                                case 1:
                                    _d = _e.sent(), cursor = _d.cursor, items = _d.items;
                                    return [4 /*yield*/, config.service.countItems({
                                            filter: createdFilter,
                                        })];
                                case 2:
                                    totalCount = (_e.sent()).count;
                                    responseHeaders = (_a = {},
                                        _a[config.afterHeaderName] = cursor.after,
                                        _a[config.beforeHeaderName] = cursor.before,
                                        _a[config.hasBeforeHeaderName] = cursor.hasBefore.toString(),
                                        _a[config.hasAfterHeaderName] = cursor.hasAfter.toString(),
                                        _a[config.totalHeaderName] = totalCount,
                                        _a);
                                    responseData = items.map(function (item) {
                                        return config.convertItemIntoDocument({ item: item, req: req, res: res });
                                    });
                                    nestedObject = (_b = {},
                                        _b[config.paginationKey] = (_c = {},
                                            _c[config.afterKey] = cursor.after,
                                            _c[config.beforeKey] = cursor.before,
                                            _c[config.hasBeforeKey] = cursor.hasBefore,
                                            _c[config.hasAfterKey] = cursor.hasAfter,
                                            _c[config.totalKey] = totalCount,
                                            _c),
                                        _b[config.dataKeyName] = responseData,
                                        _b);
                                    enveloped = boolean_1.default(req.query[config.envelopeParamName]);
                                    responseObject = enveloped ? nestedObject : responseData;
                                    headers = enveloped ? {} : responseHeaders;
                                    sendResponse_1.default({ req: req, res: res, config: config, status: http_status_codes_1.OK, headers: headers, responseObject: responseObject });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }; };
exports.default = getItems;
//# sourceMappingURL=index.js.map