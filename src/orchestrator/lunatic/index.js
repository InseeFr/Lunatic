Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var camelCase = _interopDefault(require('lodash.camelcase'));
var vtlTools = require('@inseefr/vtl-tools');
var keycode = _interopDefault(require('keycode'));

// Declaration position
var BEFORE_QUESTION_TEXT = 'BEFORE_QUESTION_TEXT';
var AFTER_QUESTION_TEXT = 'AFTER_QUESTION_TEXT';
var DETACHABLE = 'DETACHABLE'; // Declaration types

var INSTRUCTION = 'INSTRUCTION';
var COMMENT = 'COMMENT';
var HELP = 'HELP';
var WARNING = 'WARNING';
var MESSAGE_FILTER = 'MESSAGE_FILTER';
var STATEMENT = 'STATEMENT';

var declarations = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.string.isRequired,
  declarationType: PropTypes.oneOf([INSTRUCTION, COMMENT, HELP, WARNING, MESSAGE_FILTER, STATEMENT]),
  position: PropTypes.oneOf([BEFORE_QUESTION_TEXT, AFTER_QUESTION_TEXT, DETACHABLE]),
  label: PropTypes.string.isRequired
})).isRequired;

var options = PropTypes.arrayOf(PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}));

var response = PropTypes.shape({
  name: PropTypes.string,
  valueState: PropTypes.arrayOf(PropTypes.shape({
    valueType: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  }))
});

var valueType = PropTypes.oneOf(['COLLECTED', 'PREVIOUS', 'FORCED', 'EDITED', 'INPUTED']);

var lines = PropTypes.shape({
  min: PropTypes.number,
  max: PropTypes.number
});

var buildTooltip = function buildTooltip(response) {
  if (!response || !response.valueState) return {};
  var valueState = response.valueState;
  var edited = get(valueState)('EDITED');
  var forced = get(valueState)('FORCED');
  var collected = get(valueState)('COLLECTED');

  if (edited && edited.value !== null) {
    if (forced && forced.value === null) return {
      content: [{
        key: 'Brute',
        value: collected.value !== null ? collected.value : ' - '
      }],
      imgName: 'editedImg'
    };
    return {
      content: [{
        key: 'Brute',
        value: collected.value !== null ? collected.value : ' - '
      }, {
        key: 'Correction automatique',
        value: forced.value
      }],
      imgName: 'editedImg'
    };
  }

  if (forced && forced.value !== null) return {
    content: [{
      key: 'Brute',
      value: collected.value !== null ? collected.value : ' - '
    }],
    imgName: 'forcedImg'
  };
  return {};
};

var get = function get(valueState) {
  return function (valueType) {
    return valueState.find(function (v) {
      return v.valueType === valueType;
    });
  };
};

var buildResponse = function buildResponse(options) {
  return function (response) {
    if (!response || !options) return {};
    var name = response.name,
        valueState = response.valueState;
    var newValueState = valueState.map(function (_ref) {
      var valueType = _ref.valueType,
          value = _ref.value;
      return value === null ? {
        valueType: valueType,
        value: value
      } : {
        valueType: valueType,
        value: options.find(function (o) {
          return o.value === value;
        }).label
      };
    });
    return {
      name: name,
      valueState: newValueState
    };
  };
};

var getAlphabet = function getAlphabet() {
  return 'abcdefghijklmnopqrstuvwxyz'.split('');
};

var getLabelPositionClass = function getLabelPositionClass(position) {
  switch (position) {
    case 'TOP':
      return 'label-top';

    case 'BOTTOM':
      return 'label-bottom';

    case 'RIGHT':
      return 'label-right';

    default:
      return 'label-left';
  }
};

var getItemsPositioningClass = function getItemsPositioningClass(positioning) {
  switch (positioning) {
    case 'HORIZONTAL':
      return 'horizontal-options';

    case 'VERTICAL':
    default:
      return '';
  }
};

var getResponseName = function getResponseName(response) {
  return response && response.name || '';
};
var getResponseByPreference = function getResponseByPreference(preferences) {
  return function (response) {
    if (!(response && response.valueState)) return '';
    return preferences.reduce(function (_, p) {
      var res = response.valueState.find(function (r) {
        return r.valueType === p;
      });
      return res && res.value !== null ? res.value : _;
    }, '');
  };
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var buildStyleObject = function buildStyleObject(obj) {
  return obj ? Object.entries(obj).reduce(function (_, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (key.startsWith(':')) _[key] = buildStyleObject(value);else _[camelCase(key)] = value;
    return _;
  }, {}) : {};
};

var getRosterInitLines = function getRosterInitLines(cells) {
  return Array.isArray(cells) ? cells.reduce(function (_, line) {
    return [].concat(_toConsumableArray(_), [line.reduce(function (__, component) {
      if (!component.response || __) return __;
      return !isResponseEmpty(component.response);
    }, false)]);
  }, []).filter(function (b) {
    return b;
  }).length : 0;
};

var isResponseEmpty = function isResponseEmpty(response) {
  return response.valueState.reduce(function (_, _ref) {
    var value = _ref.value;
    if (!_) return _;
    return value === null;
  }, true);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n.breadcrumb-lunatic {\n  width: 100%;\n  height: 40px;\n  box-sizing: border-box;\n  border-radius: 0px;\n  background-color: #e80a4d;\n  color: white;\n  font-weight: bold;\n  font-size: 130%;\n  padding-left: 10px;\n  display: flex;\n  align-items: center; }\n\n.breadcrumb-element-lunatic:before {\n  content: '>';\n  color: white;\n  margin-left: 0.4em;\n  margin-right: 0.4em; }\n";
styleInject(css);

var Breadcrumb = function Breadcrumb(_ref) {
  var elements = _ref.elements,
      style = _ref.style;
  return React__default.createElement("div", {
    "aria-label": "breadcrumb",
    className: "breadcrumb-lunatic",
    style: buildStyleObject(style)
  }, elements.map(function (e, i) {
    return React__default.createElement(React__default.Fragment, {
      key: "breadcrumb-".concat(e.toLowerCase())
    }, e && React__default.createElement("span", {
      className: i !== 0 ? 'breadcrumb-element-lunatic' : undefined
    }, e));
  }));
};

Breadcrumb.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.object
};

var css$1 = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n.button-lunatic {\n  width: 100%;\n  color: white;\n  border-color: #e80a4d;\n  background-color: #e80a4d;\n  font-size: 1.5em;\n  font-weight: bold;\n  padding: 0.4em; }\n  .button-lunatic:hover, .button-lunatic:focus:hover {\n    color: #e80a4d;\n    background-color: white;\n    border-color: #e80a4d; }\n  .button-lunatic:focus {\n    outline: none;\n    background-color: #e07898;\n    border-color: #e07898; }\n  .button-lunatic:disabled {\n    background: #dddddd;\n    color: #e80a4d; }\n";
styleInject(css$1);

var Button = function Button(_ref) {
  var label = _ref.label,
      value = _ref.value,
      onClick = _ref.onClick,
      disabled = _ref.disabled,
      style = _ref.style;
  return React__default.createElement("button", {
    type: "button",
    "aria-label": label || 'button',
    className: "button-lunatic",
    style: buildStyleObject(style),
    disabled: disabled,
    onClick: onClick
  }, value);
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

var updateQuestionnaire = function updateQuestionnaire(valueType) {
  return function (questionnaire) {
    return function (preferences) {
      return function (updatedValue) {
        if (!['PREVIOUS', 'COLLECTED', 'FORCED', 'EDITED', 'INPUTED'].includes(valueType) || preferences.length === 0 || Object.entries(updatedValue).length !== 1) return questionnaire;

        var _Object$entries$ = _slicedToArray(Object.entries(updatedValue)[0], 2),
            name = _Object$entries$[0],
            value = _Object$entries$[1];

        var components = questionnaire.components.reduce(function (_, c) {
          return [].concat(_toConsumableArray(_), [updateComponent(valueType)(c)(preferences)(name)(value)]);
        }, []);
        return _objectSpread2({}, questionnaire, {
          components: components
        });
      };
    };
  };
};
var updateComponent = function updateComponent(valueType) {
  return function (component) {
    return function (preferences) {
      return function (name) {
        return function (value) {
          var response = component.response,
              componentType = component.componentType;

          if (!isComponentsConcernedByResponse(name)(component)) {
            return component;
          } else if (response) {
            return buildUpdatedResponse(component)(preferences)(valueType)(value);
          } else if (componentType === 'CheckboxGroup') return buildUpdatedCheckboxGroupResponse(component)(preferences)(valueType)(value)(name);else if (componentType === 'Table') return buildUpdatedTableResponse(component)(preferences)(valueType)(value)(name);
        };
      };
    };
  };
};
var isComponentsConcernedByResponse = function isComponentsConcernedByResponse(responseName) {
  return function (component) {
    return component.response && component.response.name === responseName || component.responses && component.responses.filter(function (o) {
      return o.response && o.response.name === responseName;
    }).length !== 0 || component.cells && component.cells.reduce(function (_, line) {
      line.forEach(function (l) {
        if (l.response && l.response.name) _.push(l.response.name);
      });
      return _;
    }, []).filter(function (str) {
      return str === responseName;
    }).length === 1;
  };
};
var buildUpdatedResponse = function buildUpdatedResponse(component) {
  return function (preferences) {
    return function (valueType) {
      return function (value) {
        var newValue = value;
        var valueState = component.response.valueState;

        if (preferences.length > 1 && preferences.includes(valueType)) {
          var lastValue = preferences.slice(0, preferences.length - 1).reduce(function (_, type) {
            return valueState.find(function (v) {
              return v.valueType === type;
            }).value !== null ? valueState.find(function (v) {
              return v.valueType === type;
            }).value : _;
          }, '');
          if (value === lastValue) newValue = null;
        }

        if (component.componentType === 'CheckboxOne' && valueState.find(function (v) {
          return v.valueType === valueType;
        }).value === newValue) newValue = null;
        return _objectSpread2({}, component, {
          response: _objectSpread2({}, component.response, {
            valueState: valueState.reduce(function (__, v) {
              if (v.valueType === valueType) return [].concat(_toConsumableArray(__), [_objectSpread2({}, v, {
                value: newValue
              })]);
              return [].concat(_toConsumableArray(__), [v]);
            }, [])
          })
        });
      };
    };
  };
};
var buildUpdatedVectorResponse = function buildUpdatedVectorResponse(responses) {
  return function (preferences) {
    return function (valueType) {
      return function (value) {
        return function (name) {
          return responses.reduce(function (_, cellComponent) {
            if (isComponentsConcernedByResponse(name)(cellComponent)) _.push(buildUpdatedResponse(cellComponent)(preferences)(valueType)(value));else _.push(cellComponent);
            return _;
          }, []);
        };
      };
    };
  };
};
var buildUpdatedCheckboxGroupResponse = function buildUpdatedCheckboxGroupResponse(component) {
  return function (preferences) {
    return function (valueType) {
      return function (value) {
        return function (name) {
          var responses = component.responses,
              other = _objectWithoutProperties(component, ["responses"]);

          var newResponses = buildUpdatedVectorResponse(responses)(preferences)(valueType)(value)(name);
          return _objectSpread2({}, other, {
            responses: newResponses
          });
        };
      };
    };
  };
};
var buildUpdatedTableResponse = function buildUpdatedTableResponse(component) {
  return function (preferences) {
    return function (valueType) {
      return function (value) {
        return function (name) {
          var cells = component.cells,
              other = _objectWithoutProperties(component, ["cells"]);

          var newCells = cells.reduce(function (_, line) {
            _.push(buildUpdatedVectorResponse(line)(preferences)(valueType)(value)(name));

            return _;
          }, []);
          return _objectSpread2({}, other, {
            cells: newCells
          });
        };
      };
    };
  };
};

var mergeQuestionnaireAndData = function mergeQuestionnaireAndData(questionnaire) {
  return function (data) {
    if (!questionnaire || !questionnaire.components || questionnaire.components.length === 0) return {};
    if (!data || Object.keys(data).length === 0) return questionnaire;
    var collectedData = data.COLLECTED;

    var components = questionnaire.components,
        variables = questionnaire.variables,
        props = _objectWithoutProperties(questionnaire, ["components", "variables"]);

    var filledComponents = components.reduce(function (_, component) {
      var response = component.response,
          componentType = component.componentType;
      if (response) return [].concat(_toConsumableArray(_), [mergeSimpleComponentAndData(component)(collectedData)]);else if (componentType === 'CheckboxGroup') return [].concat(_toConsumableArray(_), [mergeCheckboxGroupAndData(component)(collectedData)]);else if (componentType === 'Table') return [].concat(_toConsumableArray(_), [mergeTableAndData(component)(collectedData)]);else return [].concat(_toConsumableArray(_), [component]);
    }, []);
    var filledVariables = {
      EXTERNAL: variables ? variables.filter(function (_ref) {
        var variableType = _ref.variableType;
        return variableType === 'EXTERNAL';
      }).reduce(function (_, v) {
        return _objectSpread2({}, _, {}, initExternalVariable(v)(data));
      }, {}) : [],
      CALCULATED: variables ? variables.filter(function (_ref2) {
        var variableType = _ref2.variableType;
        return variableType === 'CALCULATED';
      }).reduce(function (_, v) {
        return _objectSpread2({}, _, {}, initCalculatedVariable(v)(data));
      }, {}) : []
    };
    return _objectSpread2({}, props, {
      components: filledComponents,
      variables: filledVariables
    });
  };
};

var mergeSimpleComponentAndData = function mergeSimpleComponentAndData(component) {
  return function (data) {
    if (!data || Object.keys(data).length === 0) return component;

    var response = component.response,
        other = _objectWithoutProperties(component, ["response"]);

    var name = response.name,
        valueState = response.valueState;
    var newValueState = valueState.map(function (_ref3) {
      var valueType = _ref3.valueType,
          value = _ref3.value;
      var newValue = data[name] !== undefined && data[name][valueType] !== undefined ? data[name][valueType] : value;
      return {
        valueType: valueType,
        value: newValue
      };
    });
    return _objectSpread2({}, other, {
      response: {
        name: name,
        valueState: newValueState
      }
    });
  };
};

var mergeCheckboxGroupAndData = function mergeCheckboxGroupAndData(component) {
  return function (data) {
    if (!data || Object.keys(data).length === 0) return component;

    var responses = component.responses,
        other = _objectWithoutProperties(component, ["responses"]);

    var newResponses = responses.map(function (c) {
      return mergeSimpleComponentAndData(c)(data);
    });
    return _objectSpread2({}, other, {
      responses: newResponses
    });
  };
};

var mergeTableAndData = function mergeTableAndData(component) {
  return function (data) {
    if (!data || Object.keys(data).length === 0) return component;

    var cells = component.cells,
        other = _objectWithoutProperties(component, ["cells"]);

    var newCells = cells.reduce(function (_, line) {
      var newLine = line.map(function (component) {
        return component.response ? mergeSimpleComponentAndData(component)(data) : component;
      });
      return [].concat(_toConsumableArray(_), [newLine]);
    }, []);
    return _objectSpread2({}, other, {
      cells: newCells
    });
  };
};

var initExternalVariable = function initExternalVariable(_ref4) {
  var name = _ref4.name;
  return function (data) {
    return _defineProperty({}, name, data && data.EXTERNAL && data.EXTERNAL[name] || null);
  };
};

var initCalculatedVariable = function initCalculatedVariable(_ref6) {
  var name = _ref6.name,
      expression = _ref6.expression;
  return function (data) {
    return _defineProperty({}, name, {
      expression: expression,
      value: null
    });
  };
};

var getState = function getState(questionnaire) {
  var components = questionnaire.components,
      variables = questionnaire.variables;
  var COLLECTED = getVariablesFromComponents(components);
  var CALCULATED = getCalculatedFromVariables(variables);
  var EXTERNAL = getExternalFromVariables(variables);
  return {
    COLLECTED: COLLECTED,
    CALCULATED: CALCULATED,
    EXTERNAL: EXTERNAL
  };
};
var getCollectedState = function getCollectedState(questionnaire) {
  return getState(questionnaire).COLLECTED;
};
var getCollectedStateByValueType = function getCollectedStateByValueType(questionnaire) {
  return function (valueType, displayNull) {
    return ['PREVIOUS', 'COLLECTED', 'FORCED', 'EDITED', 'INPUTED'].includes(valueType) ? Object.entries(getCollectedState(questionnaire)).reduce(function (_, v) {
      if (displayNull || v[1][valueType] !== null) return _objectSpread2({}, _, _defineProperty({}, v[0], v[1][valueType]));
      return _;
    }, {}) : {};
  };
};

var getVariablesFromComponents = function getVariablesFromComponents(components) {
  return Array.isArray(components) ? components.reduce(function (_, _ref) {
    var componentType = _ref.componentType,
        response = _ref.response,
        responses = _ref.responses,
        cells = _ref.cells;
    if (!componentType || ['Sequence', 'Subsequence'].includes(componentType)) return _;else if (componentType === 'CheckboxGroup') {
      return _objectSpread2({}, _, {}, getVariableFromResponses(responses));
    } else if (componentType === 'Table') {
      return _objectSpread2({}, _, {}, getVariableFromCells(cells));
    } else {
      return _objectSpread2({}, _, {}, getVariableFromResponse(response));
    }
  }, {}) : {};
};

var getVariableFromResponse = function getVariableFromResponse(response) {
  var name = response.name,
      valueState = response.valueState;
  var values = valueState.reduce(function (__, _ref2) {
    var valueType = _ref2.valueType,
        value = _ref2.value;
    return _objectSpread2({}, __, _defineProperty({}, valueType, value));
  }, {});
  return _defineProperty({}, name, values);
};

var getVariableFromResponses = function getVariableFromResponses(responses) {
  return responses.reduce(function (_, _ref4) {
    var response = _ref4.response;
    return _objectSpread2({}, _, {}, getVariableFromResponse(response));
  }, {});
};

var getVariableFromCells = function getVariableFromCells(cells) {
  return cells.reduce(function (_, components) {
    return _objectSpread2({}, _, {}, getVariablesFromComponents(components));
  }, {});
};

var getCalculatedFromVariables = function getCalculatedFromVariables(variables) {
  return variables && variables.CALCULATED ? Object.entries(variables.CALCULATED).reduce(function (_, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        name = _ref6[0],
        value = _ref6[1].value;

    return _objectSpread2({}, _, _defineProperty({}, name, value));
  }, {}) : {};
};

var getExternalFromVariables = function getExternalFromVariables(variables) {
  return variables && variables.EXTERNAL ? Object.entries(variables.EXTERNAL).reduce(function (_, _ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        name = _ref8[0],
        value = _ref8[1];

    return _objectSpread2({}, _, _defineProperty({}, name, value));
  }, {}) : {};
};

var getBindings = function getBindings(questionnaire) {
  var variables = questionnaire.variables;
  return _objectSpread2({}, getCollectedStateByValueType(questionnaire)('COLLECTED', true), {}, getCalculatedFromVariables(variables), {}, getExternalFromVariables(variables));
};

var interpret = function interpret(features) {
  return function (bindings) {
    return function (expression) {
      if (!expression) return '';
      if (!Array.isArray(features)) return expression;

      if (features.includes('VTL')) {
        try {
          return vtlTools.interpret(expression, bindings);
        } catch (e) {
          return "VTL interpret error for expression: ".concat(expression);
        }
      }

      return expression;
    };
  };
};

var css$2 = "@charset \"UTF-8\";\n.declaration-instruction {\n  font-style: italic;\n  font-size: 80%; }\n\n.declaration-comment {\n  font-size: 80%; }\n\n.declaration-statement {\n  font-style: italic;\n  font-size: 80%;\n  color: blue; }\n\n.declaration-help {\n  font-style: italic;\n  font-size: 80%;\n  color: green; }\n\n.declaration-warning {\n  font-style: bold;\n  font-size: 80%;\n  color: red; }\n\n.declaration-message_filter {\n  font-size: 100%;\n  color: #494242; }\n  .declaration-message_filter:before {\n    content: '→ '; }\n";
styleInject(css$2);

var Declarations = function Declarations(_ref) {
  var id = _ref.id,
      type = _ref.type,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings;
  var filtered = declarations.filter(function (_ref2) {
    var position = _ref2.position;
    return position === type;
  });
  return React__default.createElement("div", {
    id: "declarations-".concat(id, "-").concat(type),
    className: "declarations-lunatic"
  }, filtered.map(function (_ref3) {
    var idD = _ref3.id,
        label = _ref3.label,
        declarationType = _ref3.declarationType;
    return React__default.createElement("div", {
      key: "".concat(idD),
      className: "declaration-lunatic declaration-".concat(declarationType.toLowerCase())
    }, interpret(features)(bindings)(label));
  }));
};

Declarations.defaultProps = {
  type: 'AFTER_QUESTION_TEXT',
  declarations: [],
  features: [],
  bindings: {}
};
Declarations.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object
};

var img = new Image(); img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAAGEMEXHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABjUExURf///8Xn9XrH6Va44zKp3Eiy4GW+5b7j9Kja8Bme2CSj2p7W7vH5/UGv34XM69vw+czq9iCh2ZbT7bfg82W94+33/Njt92zB5k+14XPE6On2+4vN6sLl9Mno9i+n3Cum2wAAAIfAWccAAAAhdFJOU///////////////////////////////////////////AJ/B0CEAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAEVSURBVChTVVIBcsMgDFODm2JKIFnTbvv/Ryfb0F11Z4ptWYBSYL8wFBk34A7kLwDCUIbBfkcIHppsM2tIVy61exRoQ0LFaa2NhLSiP7l/MA7no6rsdd+UI5SINQSvZKVsBXSB7N4plnFRyihxxrFdtxeep5qwYRFZx1ZK6735IMrmJSQOZR9sXKWZSKeaVdQVfftOirdG8kHjhXlFxZ0ZWezpwrclo4Q69ZUWZj28BPyobmbCQPYxR6HdE53leLyBpGIGEELHP7GGtB/DIyds+mathZ/BEBefyNSRMJxDwRggcXbMlSlGsPM9uWHpgKnRgPB/zBCd/yStLB3z1hK6wO+8zn7o+7sx47v/s9oOdgdoLAD8AWlNC8M57XWRAAAAAElFTkSuQmCC';

var img$1 = new Image(); img$1.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAZCAMAAAFiGY6DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABUUExURf///6zc8Uiy4PH5/d/x+b7j9Bme2DKp3CSj2la442W+5YnN61O34nrH6Z7W7tDr9yCh2bfg8+33/HPE6EGv35bT7U+14czq9nDD56XZ7+n2+wAAAJWny4EAAAAcdFJOU////////////////////////////////////wAXsuLXAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABKElEQVQoU2VSC3bDIAwzJRM0hCb0ldfd/6STDFm7TgnEX2GbGHExQ4PZoc0scT0MgC/6xkqZ+tC0x6y4E4zlU5VAs8I2Wrv0/PL/xzih4gKsCJVB1RZKsvXYrJntG7gXrM/ddgZ3JPDtBRHFSQYG1Ylgy9cUhStwdaGKO6tAdX0wCQi5tUyzK6oYYNHB+aDDBXhHcjtu09uHKgfTYGTUXMRDtCOU7HUU8ShH1CdWdj1FoS/3k+4vyB3Se6KV8tv6Bamm2Z3d+GWvuNmel4WC7A9+OUcV9AKr5PHEJHIxavjui4mOisf0/B7uiqwTrp9/gisa0wuycLTs3zlI2yl7QpTvDR8FlXy3jWq3hqBYjYpXPy/A7Lmu33GIMR1r3z6OPnFngYFXbfYDTw4LkdQNpj4AAAAASUVORK5CYII=';



var img$2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	editedImg: img,
	forcedImg: img$1
});

var css$3 = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n/* Tooltip container */\n.tooltip-lunatic {\n  position: relative;\n  display: inline-block;\n  align-items: center; }\n\n/* Tooltip text */\n.tooltip-lunatic .tooltip-text {\n  visibility: hidden;\n  width: 20em;\n  background-color: #e80a4d;\n  color: #fff;\n  padding: 5px 0;\n  border-radius: 6px;\n  text-align: left;\n  /* Position the tooltip text */\n  position: absolute;\n  z-index: 1;\n  bottom: 120%;\n  left: -10em;\n  /* Fade in tooltip */\n  opacity: 0;\n  transition: opacity 0.3s; }\n\n/* Show the tooltip text when you mouse over the tooltip container */\n.tooltip-lunatic:hover .tooltip-text {\n  visibility: visible;\n  opacity: 1; }\n";
styleInject(css$3);

var TooltipResponse = function TooltipResponse(_ref) {
  var id = _ref.id,
      response = _ref.response;

  var _useState = React.useState(function () {
    return buildTooltip(response);
  }),
      _useState2 = _slicedToArray(_useState, 2),
      tooltipElements = _useState2[0],
      setTooltipElements = _useState2[1];

  React.useEffect(function () {
    setTooltipElements(buildTooltip(response));
  }, [response]);
  var content = tooltipElements.content,
      imgName = tooltipElements.imgName;
  if (!content) return null;
  return React__default.createElement("div", {
    className: "tooltip-lunatic"
  }, React__default.createElement("img", {
    id: id,
    alt: "img-tooltip",
    src: img$2[imgName].src || img$2[imgName]
  }), React__default.createElement("span", {
    className: "tooltip-text"
  }, React__default.createElement("ul", null, content.map(function (_ref2) {
    var key = _ref2.key,
        value = _ref2.value;
    return React__default.createElement("li", {
      key: "tooltip-".concat(id, "-content-").concat(key)
    }, "".concat(key, " : ").concat(value));
  }))));
};

TooltipResponse.defaultProps = {
  response: {}
};
TooltipResponse.propTypes = {
  id: PropTypes.string,
  response: response
};

var css$4 = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n.checkbox-group {\n  border: 0.1em solid #e80a4d; }\n\n.checkbox-lunatic {\n  margin: 0;\n  margin-right: 1em;\n  margin-left: 1em;\n  margin-top: 0.5em; }\n  .checkbox-lunatic:focus {\n    outline: none; }\n  .checkbox-lunatic:checked + label {\n    border: 0.1em solid #e80a4d;\n    padding: 0.3em; }\n  .checkbox-lunatic:focus {\n    box-shadow: 0 0 0.3em 0.3em #e80a4d; }\n\n.checkbox-lunatic-no-margin {\n  margin: 0;\n  margin-right: 1em;\n  margin-left: 0;\n  margin-top: 0.5em; }\n  .checkbox-lunatic-no-margin:focus {\n    outline: none; }\n  .checkbox-lunatic-no-margin:checked + label {\n    border: 0.1em solid #e80a4d;\n    padding: 0.3em; }\n\n.checkbox-modality {\n  margin-top: 1em; }\n\n.checkbox-alone {\n  margin-left: 0;\n  margin-top: 0.5em; }\n";
styleInject(css$4);

var CheckboxGroup = function CheckboxGroup(_ref) {
  var id = _ref.id,
      label = _ref.label,
      preferences = _ref.preferences,
      responses = _ref.responses,
      handleChange = _ref.handleChange,
      disabled = _ref.disabled,
      focused = _ref.focused,
      keyboardSelection = _ref.keyboardSelection,
      positioning = _ref.positioning,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings,
      tooltip = _ref.tooltip,
      style = _ref.style;
  var fieldsetStyle = style.fieldsetStyle,
      checkboxStyle = style.checkboxStyle;
  var inputRef = React.useRef();
  React.useEffect(function () {
    if (focused) inputRef.current.focus();
  }, [focused]);
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Declarations, {
    id: id,
    type: BEFORE_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("fieldset", {
    key: "checkbox-".concat(id),
    className: "checkbox-group",
    style: buildStyleObject(fieldsetStyle)
  }, React__default.createElement("legend", null, interpret(features)(bindings)(label)), React__default.createElement(Declarations, {
    id: id,
    type: AFTER_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), responses.map(function (_ref2, i) {
    var modId = _ref2.id,
        modLabel = _ref2.label,
        response = _ref2.response;
    var checked = getResponseByPreference(preferences)(response);
    return React__default.createElement("div", {
      className: "".concat(getItemsPositioningClass(positioning)),
      key: "checkbox-".concat(id, "-").concat(modId)
    }, React__default.createElement("div", {
      className: "field-container"
    }, React__default.createElement("div", {
      className: "".concat(tooltip ? 'field-with-tooltip' : 'field')
    }, React__default.createElement("div", {
      className: "checkbox-modality"
    }, React__default.createElement("input", {
      type: "checkbox",
      id: "checkbox-".concat(id, "-").concat(modId),
      ref: inputRef,
      key: "checkbox-".concat(id, "-").concat(modId),
      "aria-labelledby": "input-label-".concat(id, "-").concat(modId),
      className: "checkbox-lunatic",
      checked: checked,
      disabled: disabled,
      onChange: function onChange(e) {
        handleChange(_defineProperty({}, getResponseName(response), e.target.checked));
      }
    }), React__default.createElement("label", {
      htmlFor: "checkbox-".concat(id, "-").concat(modId),
      id: "input-label-".concat(id, "-").concat(modId),
      style: checked ? buildStyleObject(checkboxStyle) : {}
    }, keyboardSelection ? "".concat(getAlphabet()[i].toUpperCase(), " - ").concat(modLabel) : modLabel))), tooltip && React__default.createElement("div", {
      className: "tooltip"
    }, React__default.createElement(TooltipResponse, {
      id: id,
      response: response
    }))));
  })), React__default.createElement(Declarations, {
    id: id,
    type: DETACHABLE,
    declarations: declarations,
    features: features,
    bindings: bindings
  }));
};

CheckboxGroup.defaultProps = {
  label: '',
  preferences: ['COLLECTED'],
  responses: [],
  disabled: false,
  focused: false,
  keyboardSelection: false,
  positioning: 'DEFAULT',
  declarations: [],
  features: [],
  bindings: {},
  tooltip: false,
  style: {
    fieldsetStyle: {},
    checkboxStyle: {}
  }
};
CheckboxGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  preferences: PropTypes.arrayOf(valueType),
  response: response,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  keyboardSelection: PropTypes.bool,
  positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object,
  tooltip: PropTypes.bool,
  style: PropTypes.object
};

var CheckboxBoolean = function CheckboxBoolean(_ref) {
  var id = _ref.id,
      label = _ref.label,
      preferences = _ref.preferences,
      response = _ref.response,
      handleChange = _ref.handleChange,
      disabled = _ref.disabled,
      positioning = _ref.positioning,
      focused = _ref.focused,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings,
      tooltip = _ref.tooltip,
      style = _ref.style;
  var inputRef = React.useRef();
  React.useEffect(function () {
    if (focused) inputRef.current.focus();
  }, [focused]);
  var isVertical = positioning === 'VERTICAL';
  var input = React__default.createElement("input", {
    type: "checkbox",
    id: "checkbox-boolean-".concat(id),
    ref: inputRef,
    title: label ? label : 'empty-label',
    className: "checkbox-lunatic".concat(isVertical ? '-no-margin' : ''),
    style: buildStyleObject(style),
    checked: getResponseByPreference(preferences)(response),
    disabled: disabled,
    onChange: function onChange(e) {
      handleChange(_defineProperty({}, getResponseName(response), e.target.checked));
    }
  });
  return React__default.createElement("div", {
    key: "checkbox-boolean-".concat(id),
    className: "checkbox-modality"
  }, React__default.createElement(Declarations, {
    id: id,
    type: BEFORE_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), label && React__default.createElement("label", {
    htmlFor: "checkbox-boolean-".concat(id)
  }, interpret(features)(bindings)(label)), React__default.createElement(Declarations, {
    id: id,
    type: AFTER_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    className: "field-container"
  }, React__default.createElement("div", {
    className: "".concat(tooltip ? 'field-with-tooltip' : 'field')
  }, isVertical ? React__default.createElement("div", null, input) : input), tooltip && React__default.createElement("div", {
    className: "tooltip"
  }, React__default.createElement(TooltipResponse, {
    id: id,
    response: response
  }))), React__default.createElement(Declarations, {
    id: id,
    type: DETACHABLE,
    declarations: declarations,
    features: features,
    bindings: bindings
  }));
};

CheckboxBoolean.defaultProps = {
  label: '',
  preferences: ['COLLECTED'],
  response: {},
  disabled: false,
  positioning: 'DEFAULT',
  focused: false,
  declarations: [],
  features: [],
  bindings: {},
  tooltip: false,
  style: {}
};
CheckboxBoolean.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  preferences: PropTypes.arrayOf(valueType),
  response: response,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
  focused: PropTypes.bool,
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object,
  tooltip: PropTypes.bool,
  style: PropTypes.object
};

var CheckboxOne = function CheckboxOne(_ref) {
  var id = _ref.id,
      label = _ref.label,
      preferences = _ref.preferences,
      response = _ref.response,
      options = _ref.options,
      handleChange = _ref.handleChange,
      positioning = _ref.positioning,
      disabled = _ref.disabled,
      keyboardSelection = _ref.keyboardSelection,
      focused = _ref.focused,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings,
      tooltip = _ref.tooltip,
      style = _ref.style;
  var inputRef = React.useRef();
  React.useEffect(function () {
    if (focused) inputRef.current.focus();
  }, [focused]);
  var fieldsetStyle = style.fieldsetStyle,
      checkboxStyle = style.checkboxStyle;
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Declarations, {
    id: id,
    type: BEFORE_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    className: "field-container"
  }, React__default.createElement("div", {
    className: "".concat(tooltip ? 'field-with-tooltip' : 'field')
  }, React__default.createElement("fieldset", {
    key: "checkbox-one-".concat(id),
    className: "checkbox-group",
    style: buildStyleObject(fieldsetStyle)
  }, React__default.createElement("legend", null, interpret(features)(bindings)(label)), React__default.createElement(Declarations, {
    id: id,
    type: AFTER_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), options.map(function (_ref2, i) {
    var optionLabel = _ref2.label,
        optionValue = _ref2.value;
    var checked = getResponseByPreference(preferences)(response) === optionValue;
    return React__default.createElement("div", {
      key: "checkbox-one-".concat(id, "-").concat(optionValue),
      className: "checkbox-modality ".concat(getItemsPositioningClass(positioning))
    }, React__default.createElement("input", {
      type: "checkbox",
      id: "checkbox-one-".concat(id, "-").concat(optionValue),
      ref: inputRef,
      key: "checkbox-one-".concat(id, "-").concat(optionValue),
      "aria-labelledby": "input-label-".concat(id, "-").concat(optionValue),
      className: "checkbox-lunatic",
      checked: checked,
      disabled: disabled,
      onChange: function onChange() {
        return handleChange(_defineProperty({}, getResponseName(response), optionValue));
      }
    }), React__default.createElement("label", {
      htmlFor: "checkbox-one-".concat(id, "-").concat(optionValue),
      id: "input-label-".concat(id, "-").concat(optionValue),
      style: checked ? buildStyleObject(checkboxStyle) : {}
    }, keyboardSelection ? "".concat(getAlphabet()[i].toUpperCase(), " - ").concat(optionLabel) : optionLabel));
  }))), tooltip && React__default.createElement("div", {
    className: "tooltip"
  }, React__default.createElement(TooltipResponse, {
    id: id,
    response: buildResponse(options)(response)
  }))), React__default.createElement(Declarations, {
    id: id,
    type: DETACHABLE,
    declarations: declarations,
    features: features,
    bindings: bindings
  }));
};

CheckboxOne.defaultProps = {
  label: '',
  preferences: ['COLLECTED'],
  response: {},
  disabled: false,
  focused: false,
  keyboardSelection: false,
  positioning: 'DEFAULT',
  declarations: [],
  features: [],
  bindings: {},
  tooltip: false,
  style: {
    fieldsetStyle: {},
    checkboxStyle: {}
  }
};
CheckboxOne.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  preferences: PropTypes.arrayOf(valueType),
  response: response,
  options: options,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  keyboardSelection: PropTypes.bool,
  positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object,
  tooltip: PropTypes.bool,
  style: PropTypes.object
};

var css$5 = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n.datepicker-lunatic {\n  width: 100%;\n  box-sizing: border-box;\n  border: solid 2px #e80a4d;\n  border-radius: 10px;\n  padding: 5px; }\n  .datepicker-lunatic:focus {\n    outline: none;\n    box-shadow: 0 0 10px #e80a4d; }\n  .datepicker-lunatic:read-only {\n    background-color: #ebebe4; }\n";
styleInject(css$5);

var Datepicker = function Datepicker(_ref) {
  var id = _ref.id,
      label = _ref.label,
      preferences = _ref.preferences,
      response = _ref.response,
      placeholder = _ref.placeholder,
      handleChange = _ref.handleChange,
      readOnly = _ref.readOnly,
      labelPosition = _ref.labelPosition,
      required = _ref.required,
      focused = _ref.focused,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings,
      tooltip = _ref.tooltip,
      style = _ref.style;
  var inputRef = React.useRef();
  React.useEffect(function () {
    if (focused) inputRef.current.focus();
  }, [focused]);
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Declarations, {
    id: id,
    type: BEFORE_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    className: getLabelPositionClass(labelPosition)
  }, label && React__default.createElement("label", {
    htmlFor: "datepicker-".concat(id),
    id: "input-label-".concat(id),
    className: "".concat(required ? 'required' : '')
  }, interpret(features)(bindings)(label)), React__default.createElement(Declarations, {
    id: id,
    type: AFTER_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    className: "field-container"
  }, React__default.createElement("div", {
    className: "".concat(tooltip ? 'field-with-tooltip' : 'field')
  }, React__default.createElement("input", {
    type: "date",
    id: "datepicker-".concat(id),
    ref: inputRef,
    value: getResponseByPreference(preferences)(response),
    placeholder: placeholder || '',
    className: "datepicker-lunatic",
    style: buildStyleObject(style),
    readOnly: readOnly,
    required: required,
    "aria-required": required,
    onChange: function onChange(e) {
      return handleChange(_defineProperty({}, getResponseName(response), e.target.value));
    }
  })), tooltip && React__default.createElement("div", {
    className: "tooltip"
  }, React__default.createElement(TooltipResponse, {
    id: id,
    response: response
  })))), React__default.createElement(Declarations, {
    id: id,
    type: DETACHABLE,
    declarations: declarations,
    features: features,
    bindings: bindings
  }));
};

Datepicker.defaultProps = {
  preferences: ['COLLECTED'],
  placeholder: '',
  readOnly: false,
  labelPosition: 'DEFAULT',
  required: false,
  focused: false,
  response: {},
  declarations: [],
  features: [],
  bindings: {},
  tooltip: false,
  style: {}
};
Datepicker.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  preferences: PropTypes.arrayOf(valueType),
  response: response,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
  required: PropTypes.bool,
  focused: PropTypes.bool,
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object,
  tooltip: PropTypes.bool,
  style: PropTypes.object
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

var Option =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Option, _React$Component);

  function Option() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Option);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Option)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "html", React__default.createRef());

    return _this;
  }

  _createClass(Option, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.validate) {
        this.props.validate(this.props.index, this.html);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          children = _this$props.children,
          _onClick = _this$props.onClick,
          selected = _this$props.selected,
          id = _this$props.id,
          index = _this$props.index,
          hidden = _this$props.hidden,
          Component = _this$props.component;
      return React__default.createElement("li", {
        ref: this.html,
        role: "option",
        id: id,
        "aria-selected": selected ? 'true' : undefined,
        className: classnames('option', {
          selected: selected,
          hidden: hidden
        }),
        "aria-hidden": hidden ? true : undefined,
        onClick: function onClick(e) {
          e.stopPropagation();
          return _onClick ? _onClick(value, index) : null;
        }
      }, Component ? React__default.createElement(Component, {
        index: index,
        value: value,
        label: children
      }) : children);
    }
  }]);

  return Option;
}(React__default.Component);

Option.propTypes = {
  id: PropTypes.string,
  component: PropTypes.func,
  index: PropTypes.number,
  selected: PropTypes.bool,
  hidden: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.string, PropTypes.object])
};
var getValuesFromProps = function getValuesFromProps(_ref) {
  var children = _ref.children,
      options = _ref.options;
  var witch = options || children;

  if (witch) {
    var _options = Array.isArray(witch) ? witch : [witch];

    return _options.filter(function (option) {
      return option.type === Option;
    }).map(function (_ref2, index) {
      var _ref2$props = _ref2.props,
          value = _ref2$props.value,
          children = _ref2$props.children;
      return {
        index: index,
        value: value,
        label: children
      };
    }).reduce(function (a, _ref3) {
      var index = _ref3.index,
          rest = _objectWithoutProperties(_ref3, ["index"]);

      return _objectSpread2({}, a, _defineProperty({}, index, _objectSpread2({}, rest)));
    }, {});
  }

  return {};
};

var SelectPanel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SelectPanel, _React$Component);

  function SelectPanel(props) {
    var _this;

    _classCallCheck(this, SelectPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectPanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "domUl", React__default.createRef());

    _defineProperty(_assertThisInitialized(_this), "domOptions", {});

    _defineProperty(_assertThisInitialized(_this), "index", -1);

    _defineProperty(_assertThisInitialized(_this), "validateScroll", function (index) {
      var domLi = _this.domOptions[index];

      if (domLi && domLi.current && _this.domUl.current) {
        var top = domLi.current.offsetTop;
        var bottom = top + domLi.current.offsetHeight;
        var topLim = _this.domUl.current.scrollTop;
        var bottomLim = topLim + _this.domUl.current.offsetHeight;

        if (bottom > bottomLim) {
          _this.domUl.current.scrollTop = bottom - _this.domUl.current.offsetHeight;
        } else if (top < topLim) {
          _this.domUl.current.scrollTop = top;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (value, index, label) {
      if (_this.props.onClickOption) {
        _this.props.onClickOption(value, index, label);
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "handlePanelEnter", function () {
      _this.props.handleHover(true);
    });

    _defineProperty(_assertThisInitialized(_this), "handlePanelLeave", function () {
      _this.props.handleHover(false);
    });

    _this.index = props.index;
    return _this;
  }

  _createClass(SelectPanel, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.index !== this.props.index) {
        this.validateScroll(this.props.index);
        this.index = this.props.index;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          expanded = _this$props.expanded,
          index = _this$props.index,
          getId = _this$props.getId,
          children = _this$props.children,
          prefix = _this$props.prefix;
      return React__default.createElement("ul", {
        className: classnames('options', {
          hidden: !expanded
        }),
        onMouseEnter: this.handlePanelEnter,
        onMouseLeave: this.handlePanelLeave,
        role: "listbox",
        tabIndex: "0",
        "aria-activedescendant": getId(this.props.index),
        ref: this.domUl
      }, React__default.Children.toArray(children).filter(function (_ref) {
        var hidden = _ref.hidden;
        return !hidden;
      }).map(function (_ref2, i) {
        var _ref2$props = _ref2.props,
            children = _ref2$props.children,
            val = _ref2$props.value,
            rest = _objectWithoutProperties(_ref2$props, ["children", "value"]);

        return React__default.createElement(Option, _extends({}, rest, {
          hidden: prefix ? children.includes(prefix) ? false : true : false,
          key: i,
          value: val,
          selected: i === index,
          onClick: function onClick() {
            return _this2.handleClick(val, i, children);
          },
          id: getId(i),
          index: i,
          validate: function validate(i, html) {
            _this2.domOptions[i] = html;
          }
        }), children);
      }));
    }
  }]);

  return SelectPanel;
}(React__default.Component); // const SelectPanel = ({

var SelectContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SelectContainer, _React$Component);

  function SelectContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SelectContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleKeyPressed", function (e) {
      switch (keycode(e)) {
        case "up":
          e.preventDefault();
          return _this.props.up();

        case "down":
          e.preventDefault();
          return _this.props.down();

        case "home":
          e.preventDefault();
          return _this.props.home();

        case "end":
          e.preventDefault();
          return _this.props.end();

        default:
          return;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOptions", function (value, index) {
      if (_this.state.value !== value && !_this.props.readOnly) {
        _this.setState({
          expanded: undefined,
          value: value,
          index: index
        });

        return _this.props.onChange ? _this.props.onChange(value) : false;
      }

      return false;
    });

    return _this;
  }

  _createClass(SelectContainer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          id = _this$props.id;
      return React__default.createElement("div", {
        id: id,
        className: classnames(_defineProperty({}, className, className)),
        onBlur: this.props.onBlur,
        onKeyDown: this.handleKeyPressed
      }, children);
    }
  }]);

  return SelectContainer;
}(React__default.Component);

SelectContainer.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  up: PropTypes.func.isRequired,
  down: PropTypes.func.isRequired,
  home: PropTypes.func.isRequired,
  end: PropTypes.func.isRequired
};

var __SELECT_ID__ = 1;

var SelectBase =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SelectBase, _React$Component);

  function SelectBase(props) {
    var _this;

    _classCallCheck(this, SelectBase);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectBase).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      index: -1,
      initialValue: null
    });

    _defineProperty(_assertThisInitialized(_this), "overPanel", false);

    _defineProperty(_assertThisInitialized(_this), "values", []);

    _defineProperty(_assertThisInitialized(_this), "nbOptions", -1);

    _defineProperty(_assertThisInitialized(_this), "up", function () {
      return _this.validateIndex(Math.max(0, _this.state.index - 1));
    });

    _defineProperty(_assertThisInitialized(_this), "down", function () {
      return _this.validateIndex(Math.min(_this.nbOptions - 1, _this.state.index + 1));
    });

    _defineProperty(_assertThisInitialized(_this), "home", function () {
      return _this.validateIndex(0);
    });

    _defineProperty(_assertThisInitialized(_this), "end", function () {
      return _this.validateIndex(_this.nbOptions - 1);
    });

    _defineProperty(_assertThisInitialized(_this), "validateIndex", function (index) {
      var finalValue = _this.values[index];

      if (_this.state.value !== finalValue.value) {
        _this.setState({
          index: index
        });

        _this.props.setValue(finalValue.value, finalValue.label);
      }

      return index;
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      _this.props.setExpanded(!_this.props.expanded);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOptions", function (value, index, label) {
      if (_this.state.value !== value && !_this.props.readOnly) {
        _this.setState({
          index: index
        });

        _this.props.setExpanded(false);

        _this.props.setValue(value, label);
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnBlur", function (e) {
      if (!_this.overPanel) {
        _this.props.setExpanded(false);
      }
    });

    _this.idSequence = __SELECT_ID__++;
    _this.state.initialValue = _this.props.initial;
    return _this;
  }

  _createClass(SelectBase, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.values = getValuesFromProps(this.props);
      this.nbOptions = Object.keys(this.values).length;

      if (this.props.value) {
        var current = Object.entries(this.values).reduce(function (a, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              i = _ref2[0],
              _ref2$ = _ref2[1],
              label = _ref2$.label,
              value = _ref2$.value;

          return value === _this2.props.value ? {
            index: Number.parseInt(i, 10),
            label: label,
            value: value
          } : a;
        }, null);

        if (current) {
          var index = current.index,
              label = current.label,
              value = current.value;
          this.setState({
            index: index
          });
          this.props.setValue(value, label);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var index = this.state.index;

      var _this$props = this.props,
          children = _this$props.children,
          options = _this$props.options,
          id = _this$props.id,
          expanded = _this$props.expanded,
          prefix = _this$props.prefix,
          value = _this$props.value,
          rest = _objectWithoutProperties(_this$props, ["children", "options", "id", "expanded", "prefix", "value"]);

      return React__default.createElement(SelectContainer, _extends({
        id: getSelectId(id)(this.idSequence),
        onBlur: this.handleOnBlur,
        up: this.up,
        down: this.down,
        home: this.home,
        end: this.end
      }, rest), children, React__default.createElement(SelectPanel, {
        value: value,
        index: index,
        prefix: prefix,
        expanded: expanded,
        getId: getOptionId(id)(this.idSequence),
        onClickOption: this.handleClickOptions,
        handleHover: function handleHover(over) {
          return _this3.overPanel = over;
        }
      }, options));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.initial !== state.initialValue) {
        var values = getValuesFromProps(props);

        var _Object$entries$reduc = Object.entries(values).reduce(function (a, _ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              index = _ref4[0],
              _ref4$ = _ref4[1],
              value = _ref4$.value,
              label = _ref4$.label;

          return value === props.initial ? {
            index: index,
            value: value,
            label: label
          } : a;
        }, -1),
            index = _Object$entries$reduc.index,
            label = _Object$entries$reduc.label,
            value = _Object$entries$reduc.value;

        props.setValue(value, label);
        return _objectSpread2({}, state, {
          initialValue: props.value,
          index: parseInt(index, 10)
        });
      }

      return state;
    }
  }]);

  return SelectBase;
}(React__default.Component);

SelectBase.propTypes = {
  prefix: PropTypes.string,
  placeHolder: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  setExpanded: PropTypes.func.isRequired
};

var getSelectId = function getSelectId(name) {
  return function (id) {
    return id ? "".concat(name, "-").concat(id) : undefined;
  };
};

var getOptionId = function getOptionId(name) {
  return function (idSelect) {
    return function (index) {
      return index ? "".concat(name, "-").concat(idSelect, "-").concat(index) : undefined;
    };
  };
};

var allowedTypes = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]);
var selectCommonPropTypes = {
  handleChange: PropTypes.func,
  placeHolder: PropTypes.string,
  readOnly: PropTypes.bool,
  value: allowedTypes
};

var css$6 = ".writable-select {\n  position: relative;\n  background-color: snow;\n  border-radius: 4px;\n  border: solid blue 1px;\n  color: black; }\n  .writable-select .champ-saisie input {\n    outline: none;\n    margin: 5px 0 5px 8px;\n    background-color: snow;\n    border: none;\n    color: black;\n    text-align: center;\n    text-decoration: none;\n    text-align: left; }\n  .writable-select .champ-saisie .button-delete {\n    display: inline-block;\n    background: none;\n    color: inherit;\n    border: none;\n    padding: 0;\n    font: inherit;\n    cursor: pointer;\n    outline: inherit;\n    float: right;\n    margin-right: 24px; }\n    .writable-select .champ-saisie .button-delete:before {\n      transform: rotate(45deg);\n      position: absolute;\n      content: ' ';\n      height: 14px;\n      width: 2px;\n      background-color: #333; }\n    .writable-select .champ-saisie .button-delete:after {\n      transform: rotate(-45deg);\n      position: absolute;\n      content: ' ';\n      height: 14px;\n      width: 2px;\n      background-color: #333; }\n  .writable-select .champ-saisie .button-expand {\n    background: none;\n    color: inherit;\n    border: none;\n    padding: 0;\n    font: inherit;\n    cursor: pointer;\n    outline: inherit;\n    display: inline-block;\n    float: right; }\n  .writable-select .champ-saisie .arrow-up {\n    width: 10px;\n    height: 10px;\n    content: ' ';\n    border: solid black;\n    border-width: 0 3px 3px 0;\n    display: inline-block;\n    transform: rotate(-135deg);\n    -webkit-transform: rotate(-135deg); }\n  .writable-select .champ-saisie .arrow-down {\n    width: 10px;\n    height: 10px;\n    content: ' ';\n    border: solid black;\n    border-width: 0 3px 3px 0;\n    display: inline-block;\n    transform: rotate(45deg);\n    -webkit-transform: rotate(45deg); }\n  .writable-select .options {\n    list-style-type: none;\n    background-color: snow;\n    width: 100%;\n    margin: 0;\n    padding: 0;\n    border: solid blue 1px;\n    position: absolute;\n    overflow-y: auto;\n    max-height: 120px;\n    z-index: 1; }\n    .writable-select .options .option {\n      cursor: pointer; }\n    .writable-select .options .selected {\n      background-color: darkblue;\n      color: snow; }\n  .writable-select .hidden {\n    display: none; }\n";
styleInject(css$6);

var WritableSelect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WritableSelect, _React$Component);

  function WritableSelect(props) {
    var _this;

    _classCallCheck(this, WritableSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WritableSelect).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      expanded: false,
      value: null,
      label: null,
      prefix: null
    });

    _defineProperty(_assertThisInitialized(_this), "delete", function () {
      return _this.setState({
        expanded: true,
        prefix: null,
        value: null,
        label: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "expandPanel", function (e) {
      e.stopPropagation();

      _this.setState({
        expanded: !_this.state.expanded
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setValue", function (value, label) {
      _this.setState({
        value: value,
        label: label,
        prefix: null
      });

      if (_this.props.handleChange) {
        _this.props.handleChange(value);
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "onFocusInput", function () {
      return _this.setState({
        expanded: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setExpanded", function (expanded) {
      _this.setState({
        expanded: expanded
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeInput", function (e) {
      _this.setState({
        label: e.target.value,
        value: e.target.value,
        expanded: true,
        prefix: e.target.value
      });

      _this.props.handleChange(e.target.value);
    });

    if (props.value) {
      _this.state.value = props.value;
    }

    return _this;
  }

  _createClass(WritableSelect, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          expanded = _this$state.expanded,
          value = _this$state.value,
          label = _this$state.label,
          prefix = _this$state.prefix;

      var _this$props = this.props,
          initOpts = _this$props.options,
          className = _this$props.className,
          placeHolder = _this$props.placeHolder,
          readOnly = _this$props.readOnly,
          rest = _objectWithoutProperties(_this$props, ["options", "className", "placeHolder", "readOnly"]);

      var options = initOpts.map(function (_ref, i) {
        var label = _ref.label,
            value = _ref.value;
        return React__default.createElement(Option, {
          key: i,
          value: value
        }, label);
      });
      return React__default.createElement(SelectBase, _extends({
        id: "writable-select",
        prefix: prefix,
        options: options,
        expanded: expanded,
        readOnly: readOnly,
        value: value,
        placeHolder: placeHolder ? placeHolder : 'Veuillez ...',
        setExpanded: this.setExpanded,
        setValue: this.setValue,
        className: classnames('writable-select', _defineProperty({}, className, className))
      }, rest), React__default.createElement("span", {
        className: "champ-saisie"
      }, React__default.createElement("input", {
        type: "text",
        placeholder: placeHolder || 'Veuillez...',
        value: label || '',
        onChange: this.handleChangeInput,
        onFocus: this.onFocusInput
      }), value ? React__default.createElement("button", {
        className: "button-delete",
        onClick: this["delete"]
      }) : null, React__default.createElement("button", {
        className: classnames('button-expand', {
          'arrow-up': expanded,
          'arrow-down': !expanded
        }),
        onClick: this.expandPanel
      })));
    }
  }]);

  return WritableSelect;
}(React__default.Component);

WritableSelect.propTypes = _objectSpread2({
  className: PropTypes.string
}, selectCommonPropTypes, {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: allowedTypes
  }))
});

var css$7 = ".simple-select {\n  display: inline-block;\n  position: relative; }\n  .simple-select button {\n    width: 100%;\n    background-color: snow;\n    border-radius: 4px;\n    border: solid blue 1px;\n    color: black;\n    padding: 5px 8px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    text-align: left; }\n    .simple-select button:after {\n      float: right;\n      margin-left: 5px;\n      content: ' ';\n      border: solid black;\n      border-width: 0 3px 3px 0;\n      display: inline-block;\n      padding: 3px;\n      transform: rotate(45deg);\n      -webkit-transform: rotate(45deg); }\n    .simple-select button:focus {\n      border: solid 1px rgba(0, 0, 0, 0);\n      box-shadow: 0 0 1pt 1pt rgba(50, 50, 50, 0.5); }\n  .simple-select button[aria-expanded='true']:after {\n    margin-left: 5px;\n    content: ' ';\n    border: solid black;\n    border-width: 0 3px 3px 0;\n    display: inline-block;\n    padding: 3px;\n    transform: rotate(-135deg);\n    -webkit-transform: rotate(-135deg); }\n  .simple-select .read-only {\n    background-color: lightgrey; }\n  .simple-select .options {\n    list-style-type: none;\n    background-color: snow;\n    width: 100%;\n    margin: 0;\n    padding: 0;\n    border: solid blue 1px;\n    position: absolute;\n    overflow-y: auto;\n    max-height: 120px;\n    z-index: 1; }\n    .simple-select .options .option {\n      cursor: pointer; }\n    .simple-select .options .selected {\n      background-color: darkblue;\n      color: snow; }\n  .simple-select .hidden {\n    display: none; }\n";
styleInject(css$7);

var SimpleSelect = function SimpleSelect(_ref) {
  var className = _ref.className,
      children = _ref.children,
      name = _ref.name,
      readOnly = _ref.readOnly,
      placeHolder = _ref.placeHolder,
      options = _ref.options,
      valueProps = _ref.value,
      handleChange = _ref.handleChange,
      rest = _objectWithoutProperties(_ref, ["className", "children", "name", "readOnly", "placeHolder", "options", "value", "handleChange"]);

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      _setExpanded = _useState2[1];

  var _useState3 = React.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      label = _useState4[0],
      setLabel = _useState4[1];

  var _useState5 = React.useState(valueProps ? valueProps : null),
      _useState6 = _slicedToArray(_useState5, 2),
      initialValue = _useState6[0],
      setInitialValue = _useState6[1];

  var _useState7 = React.useState(valueProps ? valueProps : null),
      _useState8 = _slicedToArray(_useState7, 2),
      value = _useState8[0],
      _setValue = _useState8[1];

  if (valueProps !== initialValue) {
    setInitialValue(valueProps);

    _setValue(valueProps); // handleChange(valueProps);

  }

  return React__default.createElement(SelectBase, _extends({
    id: "simple-select",
    options: children,
    expanded: expanded,
    readOnly: readOnly,
    value: value,
    initial: valueProps,
    placeHolder: placeHolder ? placeHolder : 'Veuillez ...',
    setExpanded: function setExpanded(ex) {
      return _setExpanded(ex);
    },
    setValue: function setValue(val, label) {
      _setValue(val);

      setLabel(label);

      if (typeof handleChange === 'function') {
        handleChange(val);
      }

      return false;
    },
    className: classnames('simple-select', _defineProperty({}, className, className))
  }, rest), React__default.createElement("button", {
    "aria-haspopup": "listbox",
    className: classnames('bouton', {
      'read-only': readOnly
    }),
    "aria-expanded": expanded ? true : undefined,
    onClick: function onClick() {
      return _setExpanded(!expanded);
    },
    readOnly: readOnly ? true : undefined,
    name: name
  }, label || placeHolder || 'Veuillez....'));
};

SimpleSelect.propTypes = _objectSpread2({}, selectCommonPropTypes);

var SimpleSelect$1 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SimpleSelect$1, _React$Component);

  function SimpleSelect$1() {
    _classCallCheck(this, SimpleSelect$1);

    return _possibleConstructorReturn(this, _getPrototypeOf(SimpleSelect$1).apply(this, arguments));
  }

  _createClass(SimpleSelect$1, [{
    key: "render",
    value: function render() {
      return React__default.createElement(SimpleSelect, this.props, this.props.options.map(function (_ref, i) {
        var label = _ref.label,
            value = _ref.value;
        return React__default.createElement(Option, {
          key: i,
          value: value
        }, label);
      }));
    }
  }]);

  return SimpleSelect$1;
}(React__default.Component);

SimpleSelect$1.propTypes = _objectSpread2({}, selectCommonPropTypes, {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: allowedTypes
  }))
});

var Simple = (function (_ref) {
  var options = _ref.options,
      rest = _objectWithoutProperties(_ref, ["options"]);

  return options ? React__default.createElement(SimpleSelect$1, _extends({
    options: options
  }, rest)) : React__default.createElement(SimpleSelect, rest);
});

var css$8 = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n.dropdown-lunatic {\n  width: 100%;\n  box-sizing: border-box;\n  border: solid 2px #e80a4d;\n  border-radius: 10px;\n  padding: 5px; }\n  .dropdown-lunatic:focus {\n    outline: none;\n    box-shadow: 0 0 10px #e80a4d; }\n  .dropdown-lunatic:read-only {\n    background-color: #ebebe4; }\n";
styleInject(css$8);

var _Dropdown$defaultProp;

var Dropdown = function Dropdown(_ref) {
  var id = _ref.id,
      label = _ref.label,
      labelPosition = _ref.labelPosition,
      writable = _ref.writable,
      required = _ref.required,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings,
      props = _objectWithoutProperties(_ref, ["id", "label", "labelPosition", "writable", "required", "declarations", "features", "bindings"]);

  var preferences = props.preferences,
      response = props.response,
      handleChange = props.handleChange,
      tooltip = props.tooltip,
      options = props.options;
  var value = getResponseByPreference(preferences)(response);

  var handler = function handler(value) {
    return handleChange(_defineProperty({}, getResponseName(response), value));
  };

  return React__default.createElement("div", {
    className: getLabelPositionClass(labelPosition)
  }, React__default.createElement(Declarations, {
    id: id,
    type: BEFORE_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), label && React__default.createElement("label", {
    htmlFor: "textarea-".concat(id),
    id: "textarea-label-".concat(id),
    className: "".concat(required ? 'required' : '')
  }, interpret(features)(bindings)(label)), React__default.createElement(Declarations, {
    id: id,
    type: AFTER_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    className: "field-container"
  }, React__default.createElement("div", {
    className: "".concat(tooltip ? 'field-with-tooltip' : 'field')
  }, writable ? React__default.createElement(WritableSelect, _extends({}, props, {
    value: value,
    handleChange: handler
  })) : React__default.createElement(Simple, _extends({}, props, {
    value: value,
    handleChange: handler
  }))), tooltip && React__default.createElement("div", {
    className: "tooltip"
  }, React__default.createElement(TooltipResponse, {
    id: id,
    response: buildResponse(options)(response)
  }))), React__default.createElement(Declarations, {
    id: id,
    type: DETACHABLE,
    declarations: declarations,
    features: features,
    bindings: bindings
  }));
};

Dropdown.defaultProps = (_Dropdown$defaultProp = {
  label: '',
  preferences: ['COLLECTED'],
  response: {},
  placeholder: '',
  writable: false,
  required: false,
  tooltip: false,
  labelPosition: 'DEFAULT',
  declarations: [],
  features: [],
  bindings: {}
}, _defineProperty(_Dropdown$defaultProp, "tooltip", false), _defineProperty(_Dropdown$defaultProp, "style", {}), _Dropdown$defaultProp);
Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  preferences: PropTypes.arrayOf(valueType),
  response: response,
  options: options,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  writable: PropTypes.bool,
  required: PropTypes.bool,
  labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object,
  tooltip: PropTypes.bool,
  style: PropTypes.object
};

var css$9 = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n.input-lunatic {\n  box-sizing: border-box;\n  border: solid 2px #e80a4d;\n  border-radius: 10px;\n  padding: 5px; }\n  .input-lunatic:focus {\n    outline: none;\n    box-shadow: 0 0 10px #e80a4d; }\n  .input-lunatic:read-only {\n    background-color: #ebebe4; }\n\n.warning {\n  box-sizing: border-box;\n  border: solid 2px #f50c0c;\n  background-color: #f50c0c; }\n\n.lunatic-input-number-errors .error {\n  color: #f50c0c; }\n";
styleInject(css$9);

var Input = function Input(_ref) {
  var id = _ref.id,
      label = _ref.label,
      preferences = _ref.preferences,
      response = _ref.response,
      placeholder = _ref.placeholder,
      handleChange = _ref.handleChange,
      maxLength = _ref.maxLength,
      readOnly = _ref.readOnly,
      autoComplete = _ref.autoComplete,
      labelPosition = _ref.labelPosition,
      required = _ref.required,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings,
      focused = _ref.focused,
      tooltip = _ref.tooltip,
      style = _ref.style;
  var inputRef = React.useRef();
  React.useEffect(function () {
    if (focused) inputRef.current.focus();
  }, [focused]);
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Declarations, {
    id: id,
    type: BEFORE_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    className: getLabelPositionClass(labelPosition)
  }, label && React__default.createElement("label", {
    htmlFor: "input-".concat(id),
    id: "input-label-".concat(id),
    className: "".concat(required ? 'required' : '')
  }, interpret(features)(bindings)(label)), React__default.createElement(Declarations, {
    id: id,
    type: AFTER_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    className: "field-container"
  }, React__default.createElement("div", {
    className: "".concat(tooltip ? 'field-with-tooltip' : 'field')
  }, React__default.createElement("input", {
    type: "text",
    id: "input-".concat(id),
    ref: inputRef,
    value: getResponseByPreference(preferences)(response),
    placeholder: placeholder,
    autoComplete: autoComplete ? 'on' : 'off',
    className: "input-lunatic",
    style: buildStyleObject(style),
    readOnly: readOnly,
    maxLength: maxLength || 524288,
    required: required,
    "aria-required": required,
    onChange: function onChange(e) {
      return handleChange(_defineProperty({}, getResponseName(response), e.target.value));
    }
  })), tooltip && React__default.createElement("div", {
    className: "tooltip"
  }, React__default.createElement(TooltipResponse, {
    id: id,
    response: response
  })))), React__default.createElement(Declarations, {
    id: id,
    type: DETACHABLE,
    declarations: declarations,
    features: features,
    bindings: bindings
  }));
};

Input.defaultProps = {
  label: '',
  preferences: ['COLLECTED'],
  response: {},
  placeholder: '',
  readOnly: false,
  autoComplete: false,
  labelPosition: 'DEFAULT',
  required: false,
  focused: false,
  declarations: [],
  features: [],
  bindings: {},
  tooltip: false,
  style: {}
};
Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  preferences: PropTypes.arrayOf(valueType),
  response: response,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  autoComplete: PropTypes.bool,
  labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
  required: PropTypes.bool,
  focused: PropTypes.bool,
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object,
  tooltip: PropTypes.bool,
  style: PropTypes.object
};

var InputNumber = function InputNumber(_ref) {
  var id = _ref.id,
      label = _ref.label,
      preferences = _ref.preferences,
      response = _ref.response,
      min = _ref.min,
      max = _ref.max,
      decimals = _ref.decimals,
      placeholder = _ref.placeholder,
      handleChange = _ref.handleChange,
      readOnly = _ref.readOnly,
      autoComplete = _ref.autoComplete,
      focused = _ref.focused,
      style = _ref.style,
      unit = _ref.unit,
      labelPosition = _ref.labelPosition,
      unitPosition = _ref.unitPosition,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings,
      tooltip = _ref.tooltip,
      required = _ref.required,
      validators = _ref.validators;

  var _useState = React.useState([minMaxValidator({
    min: min,
    max: max
  })].concat(_toConsumableArray(validators)).map(function (v) {
    return v(getResponseByPreference(preferences)(response));
  }).filter(function (m) {
    return m !== undefined;
  })),
      _useState2 = _slicedToArray(_useState, 2),
      messagesError = _useState2[0],
      setMessagesError = _useState2[1];

  var inputRef = React.useRef();

  var validate = function validate(value) {
    setMessagesError([minMaxValidator({
      min: min,
      max: max
    })].concat(_toConsumableArray(validators)).map(function (v) {
      return v(value);
    }).filter(function (m) {
      return m !== undefined;
    }));
  };

  React.useEffect(function () {
    if (focused) inputRef.current.focus();
  }, [focused]);
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Declarations, {
    id: id,
    type: BEFORE_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    className: getLabelPositionClass(labelPosition)
  }, React__default.createElement("label", {
    htmlFor: "input-".concat(id),
    id: "input-label-".concat(id),
    className: "".concat(required ? 'required' : '')
  }, interpret(features)(bindings)(label), ' ', React__default.createElement("span", {
    className: "unit"
  }, unit && ['DEFAULT', 'BEFORE'].includes(unitPosition) ? "(".concat(unit, ")") : '')), React__default.createElement(Declarations, {
    id: id,
    type: AFTER_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    className: "field-container"
  }, React__default.createElement("div", {
    className: "".concat(tooltip ? 'field-with-tooltip' : 'field')
  }, React__default.createElement("input", {
    type: "number",
    id: "input-".concat(id),
    ref: inputRef,
    "aria-labelledby": "input-label-".concat(id),
    value: getResponseByPreference(preferences)(response),
    min: min,
    max: max,
    step: decimals ? "".concat(Math.pow(10, -decimals)) : '0',
    placeholder: placeholder,
    className: "input-lunatic ".concat(messagesError.length > 0 ? 'warning' : ''),
    style: buildStyleObject(style),
    readOnly: readOnly,
    autoComplete: autoComplete ? 'on' : 'off',
    required: required,
    "aria-required": required,
    onChange: function onChange(e) {
      var value = e.target.value;
      validate(value);
      handleChange(_defineProperty({}, getResponseName(response), value));
    }
  }), unitPosition === 'AFTER' && React__default.createElement("span", {
    className: "unit"
  }, unit)), tooltip && React__default.createElement("div", {
    className: "tooltip"
  }, React__default.createElement(TooltipResponse, {
    id: id,
    response: response
  }))), React__default.createElement("div", {
    className: "lunatic-input-number-errors"
  }, messagesError.map(function (m, i) {
    return React__default.createElement("div", {
      key: i,
      className: "error"
    }, m);
  }))), React__default.createElement(Declarations, {
    id: id,
    type: DETACHABLE,
    declarations: declarations,
    features: features,
    bindings: bindings
  }));
};

var minMaxValidator = function minMaxValidator(_ref2) {
  var min = _ref2.min,
      max = _ref2.max;
  return function (value) {
    if (!value) {
      return undefined;
    }

    var valueNumber = Number(value);
    if (!min && isDef(max) && valueNumber > max) return React__default.createElement("span", null, "La valeur doit \xEAtre inf\xE9rieure \xE0 ".concat(max));else if (isDef(min) && !max && valueNumber < min) return React__default.createElement("span", null, "La valeur doit \xEAtre sup\xE9rieure \xE0 ".concat(min));else if (isDef(min) && isDef(max) && (valueNumber < min || valueNumber > max)) return React__default.createElement("span", null, "La valeur doit \xEAtre comprise entre ".concat(min, " et ").concat(max));
    return undefined;
  };
};

var isDef = function isDef(number) {
  return number || number === 0;
};

InputNumber.defaultProps = {
  label: '',
  preferences: ['COLLECTED'],
  response: {},
  min: undefined,
  max: undefined,
  decimals: 0,
  placeholder: '',
  readOnly: false,
  autoComplete: false,
  focused: false,
  declarations: [],
  features: [],
  bindings: {},
  labelPosition: 'DEFAULT',
  unitPositioni: 'DEFAULT',
  required: false,
  tooltip: false,
  style: {},
  validators: []
};
InputNumber.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  preferences: PropTypes.arrayOf(valueType),
  response: response,
  min: PropTypes.number,
  max: PropTypes.number,
  decimals: PropTypes.number,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  autoComplete: PropTypes.bool,
  focused: PropTypes.bool,
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object,
  labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
  unitPosition: PropTypes.oneOf(['DEFAULT', 'BEFORE', 'AFTER']),
  required: PropTypes.bool,
  tooltip: PropTypes.bool,
  style: PropTypes.object,
  validators: PropTypes.arrayOf(PropTypes.func)
};

var css$a = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n.progress-lunatic {\n  height: 30px;\n  position: relative;\n  background: #d3d3d3;\n  -moz-border-radius: 20px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  padding: 5px;\n  box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);\n  text-align: center;\n  font-weight: bold; }\n\n.progress-lunatic > span {\n  display: block;\n  height: 100%;\n  border-radius: 20px;\n  background-color: #e80a4d;\n  opacity: 0.6;\n  box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.4);\n  position: relative;\n  top: -18px;\n  overflow: hidden; }\n\n.progress-lunatic > span:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);\n  z-index: 1;\n  background-size: 50px 50px;\n  animation: move 2s linear infinite;\n  border-top-right-radius: 8px;\n  border-bottom-right-radius: 8px;\n  border-top-left-radius: 20px;\n  border-bottom-left-radius: 20px;\n  overflow: hidden; }\n";
styleInject(css$a);

var ProgressBar = function ProgressBar(_ref) {
  var id = _ref.id,
      value = _ref.value,
      style = _ref.style;
  var controledValue = value;
  if (value < 0) controledValue = 0;
  if (value > 100) controledValue = 100;
  return React__default.createElement("div", {
    id: "progress-".concat(id),
    className: "progress-lunatic",
    style: buildStyleObject(style)
  }, "".concat(controledValue.toFixed(0), " %"), React__default.createElement("span", {
    style: {
      width: "".concat(controledValue, "%")
    }
  }));
};

ProgressBar.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  style: PropTypes.object
};

var css$b = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n.radio-group {\n  border: 0.1em solid #e80a4d; }\n\n.radio-lunatic {\n  margin: 0;\n  margin-right: 1em;\n  margin-left: 1em;\n  margin-top: 0.5em; }\n  .radio-lunatic:focus {\n    outline: none;\n    box-shadow: 0 0 0.3em 0.3em #e80a4d; }\n  .radio-lunatic:checked + label {\n    border: 0.1em solid #e80a4d;\n    padding: 0.3em; }\n\n.radio-modality {\n  margin-top: 1em; }\n";
styleInject(css$b);

var Radio = function Radio(_ref) {
  var id = _ref.id,
      label = _ref.label,
      preferences = _ref.preferences,
      response = _ref.response,
      options = _ref.options,
      handleChange = _ref.handleChange,
      disabled = _ref.disabled,
      focused = _ref.focused,
      keyboardSelection = _ref.keyboardSelection,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings,
      tooltip = _ref.tooltip,
      style = _ref.style,
      positioning = _ref.positioning;
  var inputRef = React.useRef();
  React.useEffect(function () {
    if (focused) inputRef.current.focus();
  }, [focused]);
  var fieldsetStyle = style.fieldsetStyle,
      radioStyle = style.radioStyle;
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Declarations, {
    id: id,
    type: BEFORE_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    className: "field-container"
  }, React__default.createElement("div", {
    className: "".concat(tooltip ? 'field-with-tooltip' : 'field')
  }, React__default.createElement("fieldset", {
    key: "radio-".concat(id),
    className: "radio-group",
    style: buildStyleObject(fieldsetStyle)
  }, React__default.createElement("legend", null, interpret(features)(bindings)(label)), React__default.createElement(Declarations, {
    id: id,
    type: AFTER_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), options.map(function (_ref2, i) {
    var optionLabel = _ref2.label,
        optionValue = _ref2.value;
    var checked = getResponseByPreference(preferences)(response) === optionValue;
    return React__default.createElement("div", {
      key: "radio-".concat(id, "-").concat(optionValue),
      className: "radio-modality ".concat(getItemsPositioningClass(positioning))
    }, React__default.createElement("input", {
      type: "radio",
      name: "radio-".concat(id),
      ref: inputRef,
      id: "radio-".concat(id, "-").concat(optionValue),
      "aria-labelledby": "input-label-".concat(id, "-").concat(optionValue),
      className: "radio-lunatic",
      style: buildStyleObject(style),
      checked: checked,
      disabled: disabled,
      onChange: function onChange() {
        return handleChange(_defineProperty({}, getResponseName(response), optionValue));
      }
    }), React__default.createElement("label", {
      htmlFor: "radio-".concat(id, "-").concat(optionValue),
      id: "input-label-".concat(id, "-").concat(optionValue),
      style: checked ? buildStyleObject(radioStyle) : {}
    }, keyboardSelection ? "".concat(getAlphabet()[i].toUpperCase(), " - ").concat(optionLabel) : optionLabel));
  }))), tooltip && React__default.createElement("div", {
    className: "tooltip"
  }, React__default.createElement(TooltipResponse, {
    id: id,
    response: buildResponse(options)(response)
  }))), React__default.createElement(Declarations, {
    id: id,
    type: DETACHABLE,
    declarations: declarations,
    features: features,
    bindings: bindings
  }));
};

Radio.defaultProps = {
  label: '',
  preferences: ['COLLECTED'],
  response: {},
  options: [],
  disabled: false,
  focused: false,
  keyboardSelection: false,
  positioning: 'DEFAULT',
  declarations: [],
  features: [],
  bindings: {},
  tooltip: false,
  style: {
    fieldsetStyle: {},
    radioStyle: {}
  }
};
Radio.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  preferences: PropTypes.arrayOf(valueType),
  response: response,
  options: options,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  keyboardSelection: PropTypes.bool,
  positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object,
  tooltip: PropTypes.bool,
  style: PropTypes.object
};

var css$c = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n.sequence-lunatic {\n  height: 40px;\n  box-sizing: border-box;\n  border-radius: 0px;\n  background-color: #e80a4d;\n  border: 0.1em solid #e80a4d;\n  color: white;\n  font-weight: bold;\n  font-size: 130%;\n  padding-left: 10px;\n  display: flex;\n  align-items: center; }\n";
styleInject(css$c);

var Sequence = function Sequence(_ref) {
  var id = _ref.id,
      label = _ref.label,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings,
      style = _ref.style;
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Declarations, {
    id: id,
    type: BEFORE_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    "aria-label": "sequence-".concat(id),
    className: "sequence-lunatic",
    style: buildStyleObject(style)
  }, interpret(features)(bindings)(label)), React__default.createElement(Declarations, {
    id: id,
    type: AFTER_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement(Declarations, {
    id: id,
    type: DETACHABLE,
    declarations: declarations,
    features: features,
    bindings: bindings
  }));
};

Sequence.defaultProps = {
  declarations: [],
  features: [],
  bindings: {},
  style: {}
};
Sequence.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object,
  style: PropTypes.object
};

var css$d = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n.subsequence-lunatic {\n  height: 20px;\n  box-sizing: border-box;\n  border-radius: 0px;\n  background-color: #e80a4d;\n  border: 0.1em solid #e80a4d;\n  color: white;\n  font-weight: bold;\n  font-size: 90%;\n  padding-left: 10px;\n  display: flex;\n  align-items: center; }\n";
styleInject(css$d);

var Subsequence = function Subsequence(_ref) {
  var id = _ref.id,
      label = _ref.label,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings,
      style = _ref.style;
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Declarations, {
    id: id,
    type: BEFORE_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    "aria-label": "subsequence-".concat(id),
    className: "subsequence-lunatic",
    style: buildStyleObject(style)
  }, interpret(features)(bindings)(label)), React__default.createElement(Declarations, {
    id: id,
    type: AFTER_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement(Declarations, {
    id: id,
    type: DETACHABLE,
    declarations: declarations,
    features: features,
    bindings: bindings
  }));
};

Subsequence.defaultProps = {
  declarations: [],
  features: [],
  bindings: {},
  style: {}
};
Subsequence.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object,
  style: PropTypes.object
};

var css$e = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n.textarea-lunatic {\n  width: 100%;\n  box-sizing: border-box;\n  border: solid 2px #e80a4d;\n  border-radius: 10px;\n  padding: 5px; }\n  .textarea-lunatic:focus {\n    outline: none;\n    box-shadow: 0 0 10px #e80a4d; }\n  .textarea-lunatic:read-only {\n    background-color: #ebebe4; }\n";
styleInject(css$e);

var Textarea = function Textarea(_ref) {
  var id = _ref.id,
      label = _ref.label,
      preferences = _ref.preferences,
      response = _ref.response,
      placeholder = _ref.placeholder,
      handleChange = _ref.handleChange,
      rows = _ref.rows,
      maxLength = _ref.maxLength,
      readOnly = _ref.readOnly,
      labelPosition = _ref.labelPosition,
      required = _ref.required,
      focused = _ref.focused,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings,
      tooltip = _ref.tooltip,
      style = _ref.style;
  var inputRef = React.useRef();
  React.useEffect(function () {
    if (focused) inputRef.current.focus();
  }, [focused]);
  return React__default.createElement("div", {
    className: getLabelPositionClass(labelPosition)
  }, React__default.createElement(Declarations, {
    id: id,
    type: BEFORE_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), label && React__default.createElement("label", {
    htmlFor: "textarea-".concat(id),
    id: "textarea-label-".concat(id),
    className: "".concat(required ? 'required' : '')
  }, interpret(features)(bindings)(label)), React__default.createElement(Declarations, {
    id: id,
    type: AFTER_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("div", {
    className: "field-container"
  }, React__default.createElement("div", {
    className: "".concat(tooltip ? 'field-with-tooltip' : 'field')
  }, React__default.createElement("textarea", {
    id: "textarea-".concat(id),
    ref: inputRef,
    placeholder: placeholder,
    value: getResponseByPreference(preferences)(response),
    className: "textarea-lunatic",
    style: buildStyleObject(style),
    rows: rows,
    maxLength: maxLength || 524288,
    readOnly: readOnly,
    required: required,
    "aria-required": required,
    onChange: function onChange(e) {
      return handleChange(_defineProperty({}, getResponseName(response), e.target.value));
    }
  })), tooltip && React__default.createElement("div", {
    className: "tooltip"
  }, React__default.createElement(TooltipResponse, {
    id: id,
    response: response
  }))), React__default.createElement(Declarations, {
    id: id,
    type: DETACHABLE,
    declarations: declarations,
    features: features,
    bindings: bindings
  }));
};

Textarea.defaultProps = {
  preferences: ['COLLECTED'],
  response: {},
  placeholder: '',
  rows: 5,
  readOnly: false,
  labelPosition: 'DEFAULT',
  required: false,
  focused: false,
  declarations: [],
  features: [],
  bindings: {},
  tooltip: false,
  style: {}
};
Textarea.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  preferences: PropTypes.arrayOf(valueType),
  response: response,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  rows: PropTypes.number.isRequired,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  readOnly: PropTypes.bool,
  labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
  required: PropTypes.bool,
  focused: PropTypes.bool,
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object,
  tooltip: PropTypes.bool,
  style: PropTypes.object
};



var lunatic = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Breadcrumb: Breadcrumb,
	Button: Button,
	CheckboxGroup: CheckboxGroup,
	CheckboxOne: CheckboxOne,
	CheckboxBoolean: CheckboxBoolean,
	Datepicker: Datepicker,
	Declarations: Declarations,
	Dropdown: Dropdown,
	Input: Input,
	InputNumber: InputNumber,
	ProgressBar: ProgressBar,
	Radio: Radio,
	Sequence: Sequence,
	Subsequence: Subsequence,
	Textarea: Textarea,
	TooltipResponse: TooltipResponse
});

var css$f = "* {\n  box-sizing: border-box;\n  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif; }\n\n.required:after {\n  content: ' *';\n  color: red; }\n\n.horizontal-options {\n  display: inline-block;\n  margin-right: 2em; }\n\nlabel {\n  margin-bottom: 0.5em; }\n\n.label-top {\n  display: flex;\n  flex-direction: column; }\n\n.label-bottom {\n  display: flex;\n  flex-direction: column-reverse; }\n\n.label-right {\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: baseline; }\n  .label-right :first-child {\n    margin-right: 1rem; }\n\n.label-left {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline; }\n  .label-left :first-child {\n    margin-right: 1rem; }\n\n.field-container {\n  display: flex; }\n\n.tooltip {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.field-with-tooltip {\n  display: flex; }\n\n.field {\n  width: 100%;\n  display: flex; }\n\n.table-lunatic {\n  table-layout: fixed;\n  border-collapse: collapse;\n  margin-top: 0.3em;\n  margin-bottom: 0.3em; }\n  .table-lunatic td,\n  .table-lunatic th {\n    border: 0.15em solid #e80a4d;\n    padding: 0.2em; }\n    .table-lunatic td fieldset,\n    .table-lunatic th fieldset {\n      margin: none;\n      border: none; }\n      .table-lunatic td fieldset .radio-modality,\n      .table-lunatic th fieldset .radio-modality {\n        margin-top: 0; }\n      .table-lunatic td fieldset .checkbox-modality,\n      .table-lunatic th fieldset .checkbox-modality {\n        margin-top: 0; }\n";
styleInject(css$f);

var Table = function Table(_ref) {
  var tableId = _ref.id,
      tableLabel = _ref.label,
      preferences = _ref.preferences,
      cells = _ref.cells,
      handleChange = _ref.handleChange,
      initLines = _ref.lines,
      positioning = _ref.positioning,
      declarations = _ref.declarations,
      features = _ref.features,
      bindings = _ref.bindings,
      addBtnLabel = _ref.addBtnLabel,
      tooltip = _ref.tooltip;
  var minLines = initLines ? Math.max(initLines.min, getRosterInitLines(cells)) : undefined;
  var maxLines = initLines ? initLines.max : undefined;

  var _useState = React.useState(minLines),
      _useState2 = _slicedToArray(_useState, 2),
      lines = _useState2[0],
      setLines = _useState2[1];

  var width = "".concat(100 / Math.max.apply(Math, _toConsumableArray(cells.map(function (line) {
    return line.length;
  }))), "%");
  var Button$1 = Button;
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Declarations, {
    id: tableId,
    type: BEFORE_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), tableLabel && React__default.createElement("label", {
    htmlFor: "table-one-axis-".concat(tableId),
    id: "table-one-axis-label-".concat(tableId)
  }, interpret(features)(bindings)(tableLabel)), React__default.createElement(Declarations, {
    id: tableId,
    type: AFTER_QUESTION_TEXT,
    declarations: declarations,
    features: features,
    bindings: bindings
  }), React__default.createElement("table", {
    id: "table-".concat(tableId),
    className: "table-lunatic"
  }, React__default.createElement("tbody", null, (minLines || minLines === 0 ? cells.slice(0, lines + 1) : cells).map(function (line, i) {
    return React__default.createElement("tr", {
      key: "table-".concat(tableId, "-line").concat(i)
    }, line.map(function (component, j) {
      var label = component.label,
          headerCell = component.headerCell,
          colspan = component.colspan,
          rowspan = component.rowspan,
          componentType = component.componentType,
          componentProps = _objectWithoutProperties(component, ["label", "headerCell", "colspan", "rowspan", "componentType"]);

      if (componentType) {
        var Component = lunatic[componentType];
        return React__default.createElement("td", {
          key: "table-".concat(tableId, "-line").concat(i, "-cell-").concat(j),
          style: {
            width: width
          }
        }, React__default.createElement(Component, _extends({
          label: label,
          handleChange: handleChange,
          preferences: preferences,
          positioning: positioning,
          tooltip: tooltip,
          features: features,
          bindings: bindings
        }, componentProps)));
      }

      var cellOptions = {
        key: "table-".concat(tableId, "-line").concat(i, "-cell-").concat(j),
        style: {
          width: width
        },
        colSpan: colspan || 1,
        rowSpan: rowspan || 1
      };
      return headerCell ? React__default.createElement("th", cellOptions, label) : React__default.createElement("td", cellOptions, label);
    }));
  }))), Number.isInteger(minLines) && lines < maxLines && React__default.createElement(Button$1, {
    label: "addLine",
    value: addBtnLabel,
    onClick: function onClick() {
      return setLines(lines + 1);
    }
  }), React__default.createElement(Declarations, {
    id: tableId,
    type: DETACHABLE,
    declarations: declarations,
    features: features,
    bindings: bindings
  }));
};

Table.defaultProps = {
  label: '',
  preferences: ['COLLECTED'],
  cells: [],
  lines: {},
  positioning: 'DEFAULT',
  declarations: [],
  features: [],
  bindings: {},
  addBtnLabel: 'Add a line',
  tooltip: false,
  style: {}
};
Table.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  preferences: PropTypes.arrayOf(valueType),
  cells: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
  lines: lines,
  positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
  declarations: declarations,
  features: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.object,
  addBtnLabel: PropTypes.string,
  tooltip: PropTypes.bool,
  style: PropTypes.object
};

exports.Breadcrumb = Breadcrumb;
exports.Button = Button;
exports.CheckboxBoolean = CheckboxBoolean;
exports.CheckboxGroup = CheckboxGroup;
exports.CheckboxOne = CheckboxOne;
exports.Datepicker = Datepicker;
exports.Declarations = Declarations;
exports.Dropdown = Dropdown;
exports.Input = Input;
exports.InputNumber = InputNumber;
exports.ProgressBar = ProgressBar;
exports.Radio = Radio;
exports.Sequence = Sequence;
exports.Subsequence = Subsequence;
exports.Table = Table;
exports.Textarea = Textarea;
exports.TooltipResponse = TooltipResponse;
exports.getBindings = getBindings;
exports.getCollectedState = getCollectedState;
exports.getCollectedStateByValueType = getCollectedStateByValueType;
exports.getState = getState;
exports.interpret = interpret;
exports.mergeQuestionnaireAndData = mergeQuestionnaireAndData;
exports.updateQuestionnaire = updateQuestionnaire;
//# sourceMappingURL=index.js.map
