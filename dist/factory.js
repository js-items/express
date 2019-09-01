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
var body_parser_1 = require("body-parser");
var express_1 = require("express");
var defaultTo_1 = __importDefault(require("ramda/src/defaultTo"));
var createItem_1 = __importDefault(require("./functions/createItem"));
var deleteItem_1 = __importDefault(require("./functions/deleteItem"));
var deleteItems_1 = __importDefault(require("./functions/deleteItems"));
var getItem_1 = __importDefault(require("./functions/getItem"));
var getItems_1 = __importDefault(require("./functions/getItems"));
var replaceItem_1 = __importDefault(require("./functions/replaceItem"));
var updateItem_1 = __importDefault(require("./functions/updateItem"));
var defaultTransactionHandler_1 = __importDefault(require("./utils/defaultTransactionHandler"));
exports.default = (function (_a) {
    var deleteItem = _a.deleteItem, deleteItems = _a.deleteItems, getItem = _a.getItem, getItems = _a.getItems, updateItem = _a.updateItem, replaceItem = _a.replaceItem, createItem = _a.createItem, defaultSort = _a.defaultSort, envelopParamName = _a.envelopParamName, prettyParamName = _a.prettyParamName, serverSideGeneratedIds = _a.serverSideGeneratedIds, config = __rest(_a, ["deleteItem", "deleteItems", "getItem", "getItems", "updateItem", "replaceItem", "createItem", "defaultSort", "envelopParamName", "prettyParamName", "serverSideGeneratedIds"]);
    var customDefaultSort = defaultTo_1.default({ id: 'desc' })(defaultSort);
    var customServerSideGeneratedIds = defaultTo_1.default(true)(serverSideGeneratedIds);
    var customEnvelopParamName = defaultTo_1.default('envelope')(envelopParamName);
    var customPrettyParamName = defaultTo_1.default('pretty')(prettyParamName);
    var facadeConfig = __assign({ convertDocumentIntoItem: function (_a) {
            var document = _a.document;
            return document;
        }, convertItemIntoDocument: function (_a) {
            var item = _a.item;
            return item;
        }, createFilter: function (_a) {
            var filter = _a.filter;
            return filter;
        }, createPatch: function (_a) {
            var document = _a.document;
            return document;
        }, defaultPaginationLimit: 10, defaultSort: customDefaultSort, defaultTransactionHandler: defaultTransactionHandler_1.default, envelopeParamName: customEnvelopParamName, prettyParamName: customPrettyParamName, serverSideGeneratedIds: customServerSideGeneratedIds }, config);
    var router = express_1.Router();
    var bodyParserEnabled = defaultTo_1.default(true)(config.enableJsonBodyParser);
    if (bodyParserEnabled) {
        router.use(body_parser_1.json());
    }
    var deleteItemFactory = defaultTo_1.default(deleteItem_1.default)(deleteItem);
    var getItemFactory = defaultTo_1.default(getItem_1.default)(getItem);
    var updateItemFactory = defaultTo_1.default(updateItem_1.default)(updateItem);
    var replaceItemFactory = defaultTo_1.default(replaceItem_1.default)(replaceItem);
    var deleteItemsFactory = defaultTo_1.default(deleteItems_1.default)(deleteItems);
    var getItemsFactory = defaultTo_1.default(getItems_1.default)(getItems);
    var createItemFactory = defaultTo_1.default(createItem_1.default)(createItem);
    router.delete('/:id', deleteItemFactory(facadeConfig));
    router.get('/:id', getItemFactory(facadeConfig));
    router.patch('/:id', updateItemFactory(facadeConfig));
    router.put('/:id', replaceItemFactory(facadeConfig));
    router.delete('', deleteItemsFactory(facadeConfig));
    router.get('', getItemsFactory(facadeConfig));
    router.post('', createItemFactory(facadeConfig));
    return router;
    // tslint:disable-next-line:max-file-line-count
});
//# sourceMappingURL=factory.js.map