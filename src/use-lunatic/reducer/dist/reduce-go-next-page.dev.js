"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _commons = require("./commons");

var _commons2 = require("../commons");

var _validateControls = require("./validate-controls");

var _clearPager = _interopRequireDefault(require("../commons/clear-pager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function returnToRoundabout(state) {
  var pager = state.pager;
  var roundabout = pager.roundabout;
  var page = roundabout.page;
  return _objectSpread({}, state, {
    isInLoop: false,
    pager: _objectSpread({}, (0, _clearPager["default"])(pager), {
      page: page
    }),
    modalErrors: undefined
  });
}

function getNextPage(state) {
  var pager = state.pager;
  var page = pager.page,
      maxPage = pager.maxPage;
  var p = Number.parseInt(page);
  var mp = Number.parseInt(maxPage);

  if (p < mp) {
    return "".concat(p + 1);
  }

  return "".concat(maxPage);
}

function reduceNextSubPage(state) {
  var pager = state.pager;
  var subPage = pager.subPage;

  var newPager = _objectSpread({}, pager, {
    subPage: subPage + 1,
    shallowIteration: undefined
  });

  return _objectSpread({}, state, {
    pager: _objectSpread({}, newPager, {
      lastReachedPage: (0, _commons2.getNewReachedPage)(newPager)
    }),
    modalErrors: undefined
  });
}

function reduceNextIteration(state) {
  var pager = state.pager;
  var iteration = pager.iteration,
      roundabout = pager.roundabout;

  if (roundabout) {
    return returnToRoundabout(state);
  }

  var newPager = _objectSpread({}, pager, {
    subPage: 0,
    iteration: iteration + 1
  });

  return _objectSpread({}, state, {
    pager: _objectSpread({}, newPager, {
      lastReachedPage: (0, _commons2.getNewReachedPage)(newPager)
    }),
    modalErrors: undefined
  });
}

function reduceNextPage(state, _ref) {
  var next = _ref.next;
  var pager = state.pager;

  var newPager = _objectSpread({}, pager, {
    page: next,
    iteration: undefined,
    nbIterations: undefined,
    subPage: undefined,
    nbSubPages: undefined,
    shallowIteration: undefined
  });

  return _objectSpread({}, state, {
    isInLoop: false,
    pager: _objectSpread({}, newPager, {
      lastReachedPage: (0, _commons2.getNewReachedPage)(newPager)
    }),
    modalErrors: undefined
  });
}

function reduceStartLoop(state, _ref2) {
  var next = _ref2.next,
      iterations = _ref2.iterations,
      loopDependencies = _ref2.loopDependencies;
  var pages = state.pages,
      pager = state.pager,
      executeExpression = state.executeExpression;
  var subPages = pages[next].subPages;

  if (!(0, _commons.validateLoopConditionFilter)(state, {
    next: next
  })) {
    var newPager = _objectSpread({}, pager, {
      page: next,
      subPage: undefined,
      nbSubPages: undefined,
      iteration: undefined,
      nbIterations: undefined,
      shallowIteration: undefined
    });

    return _objectSpread({}, state, {
      pager: _objectSpread({}, newPager, {
        lastReachedPage: (0, _commons2.getNewReachedPage)(newPager)
      }),
      modalErrors: undefined
    });
  }
  /*  */


  var nbIterations = executeExpression((0, _commons2.getCompatibleVTLExpression)(iterations) // {
  // 	bindingDependencies: loopDependencies,
  // 	iteration: undefined,
  // }
  );

  if (Array.isArray(subPages)) {
    var _newPager = _objectSpread({}, pager, {
      page: next,
      subPage: 0,
      nbSubPages: subPages.length,
      iteration: 0,
      nbIterations: nbIterations,
      shallowIteration: undefined
    });

    return _objectSpread({}, state, {
      isInLoop: true,
      pager: _objectSpread({}, _newPager, {
        lastReachedPage: (0, _commons2.getNewReachedPage)(_newPager)
      }),
      modalErrors: undefined
    });
  }

  return state;
}

function validateChange(state) {
  if ((0, _commons.isOnEmptyPage)(state)) {
    return reduceGoNextPage(state);
  }

  return state;
}

function reduceGoNextPage(state) {
  var pages = state.pages,
      isInLoop = state.isInLoop,
      pager = state.pager;
  var iteration = pager.iteration,
      nbIterations = pager.nbIterations,
      subPage = pager.subPage,
      nbSubPages = pager.nbSubPages,
      page = pager.page,
      roundabout = pager.roundabout;
  /* next iteration of loop/roundabout */

  if (isInLoop && subPage < nbSubPages - 1) {
    return validateChange(reduceNextSubPage(state));
  }
  /* next subpage of loop/roundabout */


  if (isInLoop && subPage === nbSubPages - 1 && iteration < nbIterations - 1) {
    return validateChange(reduceNextIteration(state));
  }
  /* exit of a roundabout */


  if (roundabout && nbIterations > 1) {
    return returnToRoundabout(state);
  }
  /* got to next page */


  var next = getNextPage(state);
  var _pages$next = pages[next],
      isLoop = _pages$next.isLoop,
      iterations = _pages$next.iterations,
      loopDependencies = _pages$next.loopDependencies;

  if (next === page) {
    // TODO: check why next === page, doesn't seems to be normal
    return state;
  }

  if (isLoop) {
    return validateChange(reduceStartLoop(state, {
      next: next,
      iterations: iterations,
      loopDependencies: loopDependencies
    }));
  }

  return validateChange(reduceNextPage(state, {
    next: next
  }));
}

var _default = (0, _validateControls.createModalControlsReducer)((0, _validateControls.createControlsReducer)(reduceGoNextPage));

exports["default"] = _default;