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
Object.defineProperty(exports, "__esModule", { value: true });
var Cursor_1 = require("@js-items/foundation/dist/interfaces/Cursor");
var defaultPromise = function () { return Promise.resolve(); };
var createInMemoryService = function (factoryConfig) { return (__assign({ countItems: function () { return Promise.resolve({ count: 1 }); }, createItem: function (_a) {
        var item = _a.item;
        return Promise.resolve({ item: item });
    }, deleteItem: defaultPromise, deleteItems: defaultPromise, getItem: function (_a) {
        var id = _a.id;
        return Promise.resolve({ item: { id: id } });
    }, getItems: function () {
        return Promise.resolve({
            cursor: {
                after: Cursor_1.start,
                before: Cursor_1.start,
                hasAfter: false,
                hasBefore: false,
            },
            items: [{ id: '1' }, { id: '2' }],
        });
    }, replaceItem: function () {
        return Promise.resolve({ item: { id: '2' } });
    }, updateItem: function () {
        return Promise.resolve({ item: { id: '1' } });
    } }, factoryConfig)); };
exports.default = createInMemoryService;
//# sourceMappingURL=index.js.map