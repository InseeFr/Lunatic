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
function fillFromState(component, state) {
    var handleChange = state.handleChange, executeExpression = state.executeExpression, preferences = state.preferences, goToPage = state.goToPage, shortcut = state.shortcut, getSuggesterStatus = state.getSuggesterStatus;
    return __assign(__assign({}, component), { handleChange: handleChange,
        executeExpression: executeExpression,
        preferences: preferences,
        goToPage: goToPage,
        shortcut: shortcut,
        getSuggesterStatus: getSuggesterStatus });
}
exports["default"] = fillFromState;
