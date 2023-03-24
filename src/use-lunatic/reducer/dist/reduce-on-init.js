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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var commons_1 = require("../commons");
var page_tag_1 = require("../commons/page-tag");
/**
 * Extract value from colllected data
 */
function getInitalValueFromCollected(variable, data) {
    if (data === void 0) { data = {}; }
    var name = variable.name;
    var fromData;
    if (name in data) {
        var _a = data[name], COLLECTED = _a.COLLECTED, FORCED = _a.FORCED;
        fromData = COLLECTED || FORCED;
    }
    if ('values' in variable && variable.values) {
        var _b = variable.values, COLLECTED = _b.COLLECTED, FORCED = _b.FORCED;
        return fromData || FORCED || COLLECTED;
    }
    return undefined;
}
/**
 * Extract value from an external data
 */
function getInitialValueFromExternal(variable, data) {
    if (data === void 0) { data = {}; }
    var name = variable.name;
    if (name in data) {
        return data[name];
    }
    return undefined;
}
/**
 * Extract value from data for the variable
 */
function getInitialValue(variable, data) {
    if (data === void 0) { data = {}; }
    var COLLECTED = data.COLLECTED, EXTERNAL = data.EXTERNAL, CALCULATED = data.CALCULATED;
    switch (variable.variableType) {
        case 'COLLECTED':
            return getInitalValueFromCollected(variable, COLLECTED);
        case 'EXTERNAL':
            return getInitialValueFromExternal(variable, EXTERNAL);
        case 'CALCULATED':
            return getInitialValueFromExternal(variable, CALCULATED);
        default:
            return null;
    }
}
function appendToArrayMap(map, key, entry) {
    var _a, _b;
    if (key in map) {
        return __assign(__assign({}, map), (_a = {}, _a[key] = __spreadArrays(map[key], [entry]), _a));
    }
    return __assign(__assign({}, map), (_b = {}, _b[key] = [entry], _b));
}
function appendToObjectMap(map, variable, value) {
    var _a, _b;
    var key = variable.name;
    var object = {
        variable: variable,
        value: value,
        type: variable.variableType
    };
    if (key in map) {
        return __assign(__assign({}, map), (_a = {}, _a[key] = __assign(__assign({}, map[key]), object), _a));
    }
    return __assign(__assign({}, map), (_b = {}, _b[key] = object, _b));
}
/**
 * Creates the variables object to set in the state
 */
function createVariables(source, data) {
    var _a = source.variables, variables = _a === void 0 ? [] : _a;
    var _b = variables.reduce(function (_a, variable) {
        var mapType = _a[0], mapVar = _a[1];
        var type = variable.variableType;
        return [
            appendToArrayMap(mapType, type, variable),
            appendToObjectMap(mapVar, variable, getInitialValue(variable, data)),
        ];
    }, [{ EXTERNAL: [], COLLECTED: [], CALCULATED: [] }, {}]), mapVariablesTypes = _b[0], mapVariables = _b[1];
    var _c = mapVariablesTypes.CALCULATED, CALCULATED = _c === void 0 ? [] : _c;
    CALCULATED.forEach(function (calculated) {
        var _a = calculated.bindingDependencies, bindingDependencies = _a === void 0 ? [] : _a;
        bindingDependencies.forEach(function (name) {
            if (name in mapVariables) {
                var variable = mapVariables[name];
                var CalculatedLinked = variable.CalculatedLinked;
                if (CalculatedLinked) {
                    CalculatedLinked.push(calculated);
                }
                else {
                    variable.CalculatedLinked = [calculated];
                }
            }
        });
    });
    return mapVariables;
}
/**
 * Check if there is a loop and populate the pager accordingly
 */
function checkInLoop(state, initialPager) {
    var _a, _b;
    var pager = state.pager, pages = state.pages, executeExpression = state.executeExpression;
    var page = pager.page;
    if (page in pages) {
        var _c = pages[page], isLoop = _c.isLoop, subPages = _c.subPages, iterations = _c.iterations, loopDependencies = _c.loopDependencies;
        if (isLoop) {
            return __assign(__assign({}, state), { pager: __assign(__assign({}, pager), { subPage: (_a = initialPager === null || initialPager === void 0 ? void 0 : initialPager.subPage) !== null && _a !== void 0 ? _a : 0, nbSubPages: (subPages !== null && subPages !== void 0 ? subPages : []).length, iteration: (_b = initialPager === null || initialPager === void 0 ? void 0 : initialPager.iteration) !== null && _b !== void 0 ? _b : 0, nbIterations: executeExpression(iterations, {
                        iteration: undefined,
                        bindingDependencies: loopDependencies
                    }) }) });
        }
    }
    return state;
}
function reduceOnInit(state, action) {
    var _a;
    var payload = action.payload;
    var source = payload.source, data = payload.data, initialPage = payload.initialPage, features = payload.features, handleChange = payload.handleChange, preferences = payload.preferences, savingType = payload.savingType, management = payload.management, shortcut = payload.shortcut, activeControls = payload.activeControls, goToPage = payload.goToPage;
    if (source && data) {
        var variables = createVariables(source, data); // map des variables
        var _b = commons_1.createExecuteExpression(variables, features), executeExpression = _b[0], updateBindings = _b[1];
        var pages = commons_1.checkLoops(commons_1.createMapPages(source));
        var maxPage = source.maxPage, _c = source.cleaning, cleaning = _c === void 0 ? {} : _c, _d = source.missingBlock, missingBlock = _d === void 0 ? {} : _d, _e = source.resizing, resizing = _e === void 0 ? {} : _e;
        var initialPager = page_tag_1.getPagerFromPageTag(initialPage);
        var pager = {
            page: (_a = initialPager === null || initialPager === void 0 ? void 0 : initialPager.page) !== null && _a !== void 0 ? _a : '1',
            maxPage: maxPage,
            subPage: undefined,
            nbSubPages: undefined,
            iteration: undefined,
            nbIterations: undefined,
            lastReachedPage: initialPage
        }, satisfies, LunaticState, _f = void 0;
        'pager';
        ;
        var _g = commons_1.isFirstLastPage(pager), isFirstPage = _g.isFirstPage, isLastPage = _g.isLastPage;
        return checkInLoop(__assign(__assign({}, state), { cleaning: cleaning,
            missingBlock: missingBlock,
            resizing: resizing,
            variables: variables,
            pages: pages,
            isFirstPage: isFirstPage,
            isLastPage: isLastPage,
            pager: pager,
            executeExpression: executeExpression,
            updateBindings: updateBindings,
            handleChange: handleChange,
            preferences: preferences,
            management: management,
            savingType: savingType,
            activeControls: activeControls,
            goToPage: goToPage,
            shortcut: shortcut }), initialPager);
    }
    return state;
}
exports["default"] = reduceOnInit;
