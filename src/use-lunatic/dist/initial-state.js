"use strict";
exports.__esModule = true;
var constants_1 = require("../utils/constants");
var use_suggesters_1 = require("./use-suggesters");
var INITIAL_STATE = {
    variables: {},
    pages: {},
    isInLoop: false,
    isFirstPage: false,
    isLastPage: false,
    features: [constants_1.VTL],
    preferences: [constants_1.COLLECTED],
    savingType: constants_1.COLLECTED,
    cleaning: {},
    missingBlock: {},
    resizing: {},
    pager: {
        page: '1',
        maxPage: '1',
        subPage: undefined,
        nbSubPages: undefined,
        iteration: undefined,
        shallowIteration: undefined,
        nbIterations: undefined
    },
    waiting: false,
    errors: undefined,
    currentErrors: undefined,
    modalErrors: undefined,
    /* fonctionnalités vtl & md */
    updateBindings: function () { },
    executeExpression: (function () { }),
    handleChange: function () { },
    goToPage: function () { return undefined; },
    activeControls: false,
    getSuggesterStatus: function (name) { return ({
        status: use_suggesters_1.SuggesterStatus.unused,
        timestamp: 0
    }); }
};
exports["default"] = INITIAL_STATE;
