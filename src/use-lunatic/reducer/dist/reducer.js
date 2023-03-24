"use strict";
exports.__esModule = true;
var reduce_on_init_1 = require("./reduce-on-init");
var reduce_go_previous_page_1 = require("./reduce-go-previous-page");
var reduce_go_next_page_1 = require("./reduce-go-next-page");
var reduce_go_to_page_1 = require("./reduce-go-to-page");
var reduce_handle_change_1 = require("./reduce-handle-change");
var reduce_on_set_waiting_1 = require("./reduce-on-set-waiting");
var reduce_update_state_1 = require("./reduce-update-state");
var actions_1 = require("../actions");
function reducer(state, action) {
    switch (action.type) {
        case actions_1.ActionKind.ON_INIT:
            return reduce_on_init_1["default"](state, action);
        case actions_1.ActionKind.GO_PREVIOUS_PAGE:
            return reduce_go_previous_page_1["default"](state);
        case actions_1.ActionKind.GO_NEXT_PAGE:
            return reduce_go_next_page_1["default"](state, action);
        case actions_1.ActionKind.GO_TO_PAGE:
            return reduce_go_to_page_1["default"](state, action);
        case actions_1.ActionKind.HANDLE_CHANGE:
            return reduce_handle_change_1["default"](state, action);
        case actions_1.ActionKind.ON_SET_WAITING:
            return reduce_on_set_waiting_1["default"](state, action);
        case actions_1.ActionKind.UPDATE_STATE:
            return reduce_update_state_1.reduceUpdateState(state, action);
        default:
            return state;
    }
}
exports["default"] = reducer;
