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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-any
var sourceMapSupport = __importStar(require("source-map-support"));
var assertOnReplaceItem_1 = __importDefault(require("../utils/assertOnReplaceItem"));
var initTests_1 = __importDefault(require("../utils/initTests"));
sourceMapSupport.install();
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var foundation_1 = require("@js-items/foundation");
var testItem_1 = __importDefault(require("@js-items/foundation/dist/functions/utils/testItem"));
var http_status_codes_1 = require("http-status-codes");
var constants_1 = require("../../constants");
var createInMemoryService_1 = __importDefault(require("../utils/createInMemoryService"));
jest.mock('uuid', function () { return ({
    v4: jest.fn(function () { return '1'; }),
}); });
var notExistingId = 'not-existing-id';
var replaceItem = jest.fn(function (_a) {
    var item = _a.item, id = _a.id;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            if (id !== testItem_1.default.id) {
                return [2 /*return*/, Promise.reject(new foundation_1.ItemNotFoundError('item', testItem_1.default.id))];
            }
            return [2 /*return*/, Promise.resolve({ item: item })];
        });
    });
});
describe('@replaceItem', function () {
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            jest.clearAllMocks();
            return [2 /*return*/];
        });
    }); });
    var service = createInMemoryService_1.default({
        replaceItem: replaceItem,
    });
    var request = initTests_1.default({ service: service }).request;
    var expectedParams = {
        filter: {},
        id: testItem_1.default.id,
        item: testItem_1.default,
    };
    var defaultOptions = {
        body: testItem_1.default,
        client: request,
        expectedParams: expectedParams,
        replaceItem: replaceItem,
        url: constants_1.TEST_URL + "/" + testItem_1.default.id,
    };
    var notFoundOptions = {
        body: __assign({}, testItem_1.default, { id: notExistingId }),
        expectedParams: __assign({}, expectedParams, { id: notExistingId, item: __assign({}, testItem_1.default, { id: notExistingId }) }),
    };
    it('throws not found error when item does exist', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assertOnReplaceItem_1.default(__assign({}, defaultOptions, notFoundOptions, { status: http_status_codes_1.NOT_FOUND, url: constants_1.TEST_URL + "/" + notExistingId }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws not found error when item does exist and envelope is enabled', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assertOnReplaceItem_1.default(__assign({}, defaultOptions, notFoundOptions, { params: {
                            envelope: true,
                        }, status: http_status_codes_1.OK, url: constants_1.TEST_URL + "/" + notExistingId }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('replaces item', function () { return __awaiter(_this, void 0, void 0, function () {
        var updatedItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatedItem = {
                        booleanProperty: true,
                        id: testItem_1.default.id,
                        numberProperty: 999,
                        stringProperty: 'testowo',
                    };
                    return [4 /*yield*/, assertOnReplaceItem_1.default(__assign({}, defaultOptions, { body: updatedItem, expectedParams: __assign({}, expectedParams, { item: updatedItem }) }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // tslint:disable-next-line:max-file-line-count
});
//# sourceMappingURL=index.spec.js.map