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
var constants_1 = require("../../../utils/constants");
/**
 * Refresh calculated variables with the new value in the bindings
 */
function createRefreshCalculated(_a) {
    var variables = _a.variables, execute = _a.execute, bindings = _a.bindings;
    /**
     * Links beetween calculated and collected variables :
     * changes on collected involve changes on correlated variables.
     */
    var toRefreshVariables = new Map();
    // On start, all calculated variables need to be refresh.
    Object.values(variables).forEach(function (_a) {
        var variable = _a.variable;
        var variableType = variable.variableType, name = variable.name;
        if (variableType === constants_1.CALCULATED) {
            toRefreshVariables.set(name, variable);
        }
    });
    function getIteration(_a) {
        var name = _a.name, iteration = _a.iteration, linksIterations = _a.linksIterations;
        if (name === constants_1.X_AXIS && linksIterations)
            return linksIterations[0];
        if (name === constants_1.Y_AXIS && linksIterations)
            return linksIterations[1];
        return iteration;
    }
    function buildValue(args) {
        var expression = args.expression, logging = args.logging, shapeFrom = args.shapeFrom, name = args.name, iteration = args.iteration, linksIterations = args.linksIterations;
        var value = execute(expression, {
            logging: logging,
            iteration: shapeFrom
                ? getIteration({ name: name, iteration: iteration, linksIterations: linksIterations })
                : undefined
        });
        if (linksIterations !== undefined)
            return value;
        if (shapeFrom && iteration !== undefined) {
            if (bindings[name] === undefined) {
                var shapeVariable = bindings[shapeFrom];
                if (Array.isArray(shapeVariable)) {
                    var initialValue = shapeVariable.map(function (_, i) {
                        return execute(expression, {
                            logging: logging,
                            iteration: i
                        });
                    });
                    bindings[name] = initialValue;
                    return initialValue[iteration];
                }
            }
            var binding = bindings[name];
            if (Array.isArray(binding)) {
                binding[iteration] = value;
                return binding[iteration];
            }
            else {
                console.error("Binding not array! " + bindings[name] + " for " + name);
                bindings[name] = null;
                return null;
            }
        }
        else if (shapeFrom && iteration === undefined) {
            // TODO: optimize
            var baseVar = bindings[shapeFrom];
            if (Array.isArray(baseVar)) {
                var v = baseVar.map(function (_, i) {
                    return execute(expression, {
                        logging: logging,
                        iteration: i
                    });
                });
                bindings[name] = v;
                return v;
            }
        }
        bindings[name] = value;
        return value;
    }
    function refreshCalculated(map, _a) {
        var rootExpression = _a.rootExpression, iteration = _a.iteration, linksIterations = _a.linksIterations;
        return Object.entries(map).reduce(function (sub, _a) {
            var _b, _c;
            var name = _a[0], current = _a[1];
            var calculatedVariable = variables[name];
            if (calculatedVariable.variable.variableType === constants_1.CALCULATED &&
                toRefreshVariables.has(name)) {
                var _d = calculatedVariable.variable, expression = _d.expression, shapeFrom = _d.shapeFrom;
                var logging = function (expression, bindings, e) {
                    if (process.env.NODE_ENV === 'development') {
                        console.warn("VTL error when refreshing calculated variable " + name + " :  " + (typeof expression === 'string' ? expression : expression.value), { bindings: bindings });
                        console.warn("root expression : " + rootExpression);
                        console.warn(e);
                    }
                };
                var value = buildValue({
                    expression: expression,
                    logging: logging,
                    shapeFrom: shapeFrom,
                    name: name,
                    iteration: iteration,
                    linksIterations: linksIterations
                });
                if (iteration !== undefined)
                    toRefreshVariables["delete"](name);
                return __assign(__assign({}, sub), (_b = {}, _b[name] = value, _b));
            }
            return __assign(__assign({}, sub), (_c = {}, _c[name] = current, _c));
        }, {});
    }
    function setToRefreshCalculated(name, variable) {
        toRefreshVariables.set(name, variable);
    }
    return [refreshCalculated, setToRefreshCalculated];
}
exports["default"] = createRefreshCalculated;
