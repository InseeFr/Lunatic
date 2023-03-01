"use strict";
exports.__esModule = true;
var react_1 = require("react");
var initial_state_1 = require("./initial-state");
var actions = require("./actions");
var reducer_1 = require("./reducer");
var commons_1 = require("./commons");
var constants_1 = require("../utils/constants");
// @ts-ignore
var use_suggesters_1 = require("./use-suggesters");
var get_data_1 = require("./commons/get-data");
var lunatic_context_1 = require("./lunatic-context");
var DEFAULT_DATA = {};
var DEFAULT_FEATURES = ['VTL', 'MD'];
var DEFAULT_PREFERENCES = [constants_1.COLLECTED];
var nothing = function () { };
function useLunatic(source, data, _a) {
    if (data === void 0) { data = DEFAULT_DATA; }
    var _b = _a.features, features = _b === void 0 ? DEFAULT_FEATURES : _b, _c = _a.preferences, preferences = _c === void 0 ? DEFAULT_PREFERENCES : _c, _d = _a.savingType, savingType = _d === void 0 ? constants_1.COLLECTED : _d, _e = _a.onChange, onChange = _e === void 0 ? nothing : _e, _f = _a.management, management = _f === void 0 ? false : _f, _g = _a.shortcut, shortcut = _g === void 0 ? false : _g, _h = _a.initialPage, initialPage = _h === void 0 ? '1' : _h, _j = _a.autoSuggesterLoading, autoSuggesterLoading = _j === void 0 ? false : _j, _k = _a.activeControls, activeControls = _k === void 0 ? false : _k, custom = _a.custom, getReferentiel = _a.getReferentiel;
    var _l = react_1.useReducer(reducer_1["default"], initial_state_1["default"]), state = _l[0], dispatch = _l[1];
    var pager = state.pager, waiting = state.waiting, modalErrors = state.modalErrors, errors = state.errors, currentErrors = state.currentErrors;
    var components = commons_1.useComponentsFromState(state);
    var suggesters = source.suggesters;
    var Provider = react_1.useMemo(function () { return lunatic_context_1.createLunaticProvider(custom); }, [custom]);
    var getSuggesterStatus = use_suggesters_1.useSuggesters({
        auto: autoSuggesterLoading,
        getReferentiel: getReferentiel,
        suggesters: suggesters
    });
    var getErrors = react_1.useCallback(function () {
        return errors;
    }, [errors]);
    var getModalErrors = react_1.useCallback(function () {
        return modalErrors;
    }, [modalErrors]);
    var getCurrentErrors = react_1.useCallback(function () {
        return currentErrors;
    }, [currentErrors]);
    var goPreviousPage = react_1.useCallback(function () {
        dispatch(actions.goPreviousPage());
    }, [dispatch]);
    var goNextPage = react_1.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        dispatch(actions.goNextPage(payload));
    }, [dispatch]);
    var goToPage = react_1.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        dispatch(actions.goToPage(payload));
    }, [dispatch]);
    var getComponents = react_1.useCallback(function () {
        // validate variables ?
        return components;
    }, [components]);
    var handleChange = react_1.useCallback(function (response, value, args) {
        dispatch(actions.handleChange(response, value, args));
        onChange(response, value, args);
    }, [dispatch, onChange]);
    var getData = function (withRefreshedCalculated) {
        var variables = state.variables;
        return get_data_1.getQuestionnaireData({ variables: variables, withRefreshedCalculated: withRefreshedCalculated });
    };
    var pageTag = commons_1.getPageTag(pager);
    var _m = commons_1.isFirstLastPage(pager), isFirstPage = _m.isFirstPage, isLastPage = _m.isLastPage;
    react_1.useEffect(function () {
        dispatch(actions.onInit({
            source: source,
            data: data,
            initialPage: initialPage,
            features: features,
            preferences: preferences,
            savingType: savingType,
            management: management,
            shortcut: shortcut,
            handleChange: handleChange,
            activeControls: activeControls,
            goToPage: goToPage,
            getSuggesterStatus: getSuggesterStatus
        }));
    }, [
        source,
        data,
        initialPage,
        features,
        preferences,
        savingType,
        management,
        shortcut,
        handleChange,
        activeControls,
        goToPage,
        getSuggesterStatus,
    ]);
    return {
        getComponents: getComponents,
        goPreviousPage: goPreviousPage,
        goNextPage: goNextPage,
        goToPage: goToPage,
        getErrors: getErrors,
        getModalErrors: getModalErrors,
        getCurrentErrors: getCurrentErrors,
        pageTag: pageTag,
        isFirstPage: isFirstPage,
        isLastPage: isLastPage,
        pager: pager,
        waiting: waiting,
        getData: getData,
        Provider: Provider
    };
}
exports["default"] = useLunatic;
