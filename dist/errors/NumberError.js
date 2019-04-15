"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-any
var make_error_1 = require("make-error");
var NumberError = /** @class */ (function (_super) {
    __extends(NumberError, _super);
    function NumberError(data, path) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.path = path;
        return _this;
    }
    return NumberError;
}(make_error_1.BaseError));
exports.default = NumberError;
//# sourceMappingURL=NumberError.js.map