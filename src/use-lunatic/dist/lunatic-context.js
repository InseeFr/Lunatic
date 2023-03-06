"use strict";
exports.__esModule = true;
exports.createLunaticProvider = exports.LunaticContext = void 0;
var react_1 = require("react");
exports.LunaticContext = react_1.createContext({
    custom: {}
});
function createLunaticProvider(custom) {
    if (custom === void 0) { custom = {}; }
    return function Provider(_a) {
        var children = _a.children;
        return (react_1["default"].createElement(exports.LunaticContext.Provider, { value: { custom: custom } }, children));
    };
}
exports.createLunaticProvider = createLunaticProvider;
