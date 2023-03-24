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
exports.__esModule = true;
var page_tag_1 = require("../page-tag");
function fillErrors(component, state) {
    var _a;
    var page = page_tag_1.getPageTag(state.pager);
    var errors = (_a = state.errors) === null || _a === void 0 ? void 0 : _a[page];
    return __assign(__assign({}, component), { errors: errors });
}
exports["default"] = fillErrors;
