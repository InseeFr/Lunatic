"use strict";
exports.__esModule = true;
exports.onSetWaiting = exports.handleChange = exports.onInit = exports.goToPage = exports.goNextPage = exports.goPreviousPage = exports.ActionKind = void 0;
var ActionKind;
(function (ActionKind) {
    ActionKind["GO_PREVIOUS_PAGE"] = "use-lunatic/go-previous";
    ActionKind["GO_NEXT_PAGE"] = "use-lunatic/go-next";
    ActionKind["GO_TO_PAGE"] = "use-lunatic/go-to-page";
    ActionKind["ON_INIT"] = "use-lunatic/on-init";
    ActionKind["HANDLE_CHANGE"] = "use-lunatic/handle-change";
    ActionKind["ON_SET_WAITING"] = "use-lunatic/on-set-waiting";
})(ActionKind = exports.ActionKind || (exports.ActionKind = {}));
var actionCreator = function (type) {
    return function (payload) {
        return {
            type: type,
            payload: payload
        };
    };
};
exports.goPreviousPage = function () {
    return ({
        type: ActionKind.GO_PREVIOUS_PAGE,
        payload: {}
    });
};
exports.goNextPage = actionCreator(ActionKind.GO_NEXT_PAGE);
exports.goToPage = actionCreator(ActionKind.GO_TO_PAGE);
exports.onInit = actionCreator(ActionKind.ON_INIT);
exports.handleChange = function (response, value, args) {
    return ({
        type: ActionKind.HANDLE_CHANGE,
        payload: { response: response, value: value, args: args }
    });
};
exports.onSetWaiting = function (status) {
    return ({
        type: ActionKind.ON_SET_WAITING,
        payload: { status: status }
    });
};
