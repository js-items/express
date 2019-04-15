"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createTestUrl = function (_a) {
    var _b = _a.params, params = _b === void 0 ? {} : _b, url = _a.url;
    return Object.keys(params).reduce(function (acc, next) {
        if (acc.indexOf('?') === -1) {
            return acc + "?" + next + "=" + params[next];
        }
        return acc + "&" + next + "=" + params[next];
    }, url);
};
exports.default = createTestUrl;
//# sourceMappingURL=index.js.map