"use strict";
exports.__esModule = true;
var actions = require("./actions");
var react_1 = require("react");
var commons_1 = require("./commons");
var constants_1 = require("../utils/constants");
var i18n_1 = require("../i18n");
var initial_state_1 = require("./initial-state");
var lunatic_context_1 = require("./lunatic-context");
var get_data_1 = require("./commons/get-data");
var getOverview_1 = require("./commons/getOverview");
var reducer_1 = require("./reducer");
var use_loop_variables_1 = require("./hooks/use-loop-variables");
var use_suggesters_1 = require("./use-suggesters");
var empty = {}; // Keep the same empty object (to avoid problem with useEffect dependencies)
var DEFAULT_DATA = empty;
var DEFAULT_FEATURES = ['VTL', 'MD'];
var DEFAULT_PREFERENCES = [constants_1.COLLECTED];
var DEFAULT_SHORTCUT = { dontKnow: '', refused: '' };
var DEFAULT_DONT_KNOW = i18n_1["default"].DK;
var DEFAULT_REFUSED = i18n_1["default"].RF;
var nothing = function () { };
function useLunatic(source, data, _a) {
    if (data === void 0) { data = DEFAULT_DATA; }
    var _b = _a.features, features = _b === void 0 ? DEFAULT_FEATURES : _b, _c = _a.preferences, preferences = _c === void 0 ? DEFAULT_PREFERENCES : _c, _d = _a.savingType, savingType = _d === void 0 ? constants_1.COLLECTED : _d, _e = _a.onChange, onChange = _e === void 0 ? nothing : _e, _f = _a.management, management = _f === void 0 ? false : _f, _g = _a.shortcut, shortcut = _g === void 0 ? false : _g, _h = _a.initialPage, initialPage = _h === void 0 ? '1' : _h, _j = _a.autoSuggesterLoading, autoSuggesterLoading = _j === void 0 ? false : _j, _k = _a.activeControls, activeControls = _k === void 0 ? false : _k, getReferentiel = _a.getReferentiel, _l = _a.custom, custom = _l === void 0 ? empty : _l, 
    // Calculate an overview of every sequence (will be exposed as "overview")
    _m = _a.withOverview, 
    // Calculate an overview of every sequence (will be exposed as "overview")
    withOverview = _m === void 0 ? false : _m, _o = _a.missing, missing = _o === void 0 ? false : _o, _p = _a.missingStrategy, missingStrategy = _p === void 0 ? function () { } : _p, _q = _a.missingShortcut, missingShortcut = _q === void 0 ? DEFAULT_SHORTCUT : _q, _r = _a.dontKnowButton, dontKnowButton = _r === void 0 ? DEFAULT_DONT_KNOW : _r, _s = _a.refusedButton, refusedButton = _s === void 0 ? DEFAULT_REFUSED : _s;
    var _t = react_1.useReducer(reducer_1["default"], initial_state_1["default"]), state = _t[0], dispatch = _t[1];
    var pager = state.pager, waiting = state.waiting, modalErrors = state.modalErrors, errors = state.errors, currentErrors = state.currentErrors, overview = state.overview;
    var components = commons_1.useComponentsFromState(state);
    var suggesters = source.suggesters;
    // Required context provider: cleaner than prop drilling through every component
    var Provider = react_1.useMemo(function () {
        return lunatic_context_1.createLunaticProvider({
            custom: custom,
            management: management,
            missing: missing,
            missingStrategy: missingStrategy,
            shortcut: shortcut,
            missingShortcut: missingShortcut,
            dontKnowButton: dontKnowButton,
            refusedButton: refusedButton
        });
    }, [
        custom,
        management,
        missing,
        missingStrategy,
        shortcut,
        missingShortcut,
        dontKnowButton,
        refusedButton,
    ]);
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
    var buildedOverview = react_1.useMemo(function () { return getOverview_1.overviewWithChildren(overview); }, [overview]);
    var pageTag = commons_1.getPageTag(pager);
    var _u = commons_1.isFirstLastPage(pager), isFirstPage = _u.isFirstPage, isLastPage = _u.isLastPage;
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
            withOverview: withOverview
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
        withOverview,
        goToPage,
    ]);
    react_1.useEffect(function () {
        dispatch(actions.updateState({ getSuggesterStatus: getSuggesterStatus }));
    }, [getSuggesterStatus]);
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
        Provider: Provider,
        overview: buildedOverview,
        loopVariables: use_loop_variables_1.useLoopVariables(pager, state.pages)
    };
}
exports["default"] = useLunatic;
