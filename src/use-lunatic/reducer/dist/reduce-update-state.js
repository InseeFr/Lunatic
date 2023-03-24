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
exports.reduceUpdateState = void 0;
function reduceUpdateState(state, action) {
    var payload = action.payload;
    var getSuggesterStatus = payload.getSuggesterStatus;
    if (getSuggesterStatus !== undefined) {
        return __assign(__assign({}, state), { getSuggesterStatus: getSuggesterStatus });
    }
    return state;
}
exports.reduceUpdateState = reduceUpdateState;
