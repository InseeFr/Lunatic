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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.useSuggesters = exports.SuggesterStatus = void 0;
var react_1 = require("react");
var initStore_1 = require("../utils/store-tools/initStore");
var create_append_task_1 = require("../utils/suggester-workers/append-to-index/create-append-task");
var SuggesterStatus;
(function (SuggesterStatus) {
    SuggesterStatus[SuggesterStatus["unused"] = 0] = "unused";
    SuggesterStatus[SuggesterStatus["idle"] = 1] = "idle";
    SuggesterStatus[SuggesterStatus["pending"] = 2] = "pending";
    SuggesterStatus[SuggesterStatus["success"] = 3] = "success";
    SuggesterStatus[SuggesterStatus["unknown"] = 4] = "unknown";
    SuggesterStatus[SuggesterStatus["error"] = 5] = "error";
})(SuggesterStatus = exports.SuggesterStatus || (exports.SuggesterStatus = {}));
function nothing() { }
// with side effect !
function setStatus(status, name, state) {
    if (status && status.current) {
        var current = status.current;
        if (name in current)
            current[name] = state;
    }
}
function useSuggesters(_a) {
    var auto = _a.auto, getReferentiel = _a.getReferentiel, suggesters = _a.suggesters;
    var status = react_1.useRef();
    var _b = react_1.useState(Date.now()), timestamp = _b[0], setTimestamp = _b[1];
    var getSuggesterStatus = react_1.useCallback(function (name) {
        var current = status.current;
        if (!auto) {
            return { status: SuggesterStatus.unused, timestamp: timestamp };
        }
        if (current && name in current) {
            return { status: current[name], timestamp: timestamp };
        }
        return { status: SuggesterStatus.unknown, timestamp: timestamp };
    }, [status, timestamp, auto]);
    react_1.useEffect(function () {
        if (suggesters) {
            status.current = suggesters.reduce(function (a, _a) {
                var _b;
                var name = _a.name;
                return (__assign(__assign({}, a), (_b = {}, _b[name] = SuggesterStatus.idle, _b)));
            }, {});
        }
    }, [suggesters, status]);
    react_1.useEffect(function () {
        var aborts = [];
        if (typeof getReferentiel === 'function' &&
            Array.isArray(suggesters) &&
            auto) {
            suggesters.forEach(function (store) {
                var name = store.name;
                var current = status.current;
                (function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var isClean, data, _a, append, abort, result, e_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!current) return [3 /*break*/, 8];
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 7, , 8]);
                                    if (!(current[name] === SuggesterStatus.idle)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, initStore_1.initStore(store)];
                                case 2:
                                    isClean = _b.sent();
                                    if (!isClean) {
                                        setStatus(status, name, SuggesterStatus.error);
                                        setTimestamp(Date.now());
                                    }
                                    else {
                                        setStatus(status, name, SuggesterStatus.pending);
                                        setTimestamp(Date.now());
                                    }
                                    _b.label = 3;
                                case 3:
                                    if (!(current[name] === SuggesterStatus.pending)) return [3 /*break*/, 6];
                                    return [4 /*yield*/, getReferentiel(name)];
                                case 4:
                                    data = _b.sent();
                                    _a = create_append_task_1.createAppendTask(store, 1, nothing), append = _a[0], abort = _a[1];
                                    aborts.push(abort);
                                    return [4 /*yield*/, append(data)];
                                case 5:
                                    result = _b.sent();
                                    if (result) {
                                        setStatus(status, name, SuggesterStatus.success);
                                        setTimestamp(Date.now());
                                    }
                                    else {
                                        setStatus(status, name, SuggesterStatus.error);
                                        setTimestamp(Date.now());
                                    }
                                    _b.label = 6;
                                case 6: return [3 /*break*/, 8];
                                case 7:
                                    e_1 = _b.sent();
                                    setStatus(status, name, SuggesterStatus.error);
                                    setTimestamp(Date.now());
                                    return [3 /*break*/, 8];
                                case 8: return [2 /*return*/];
                            }
                        });
                    });
                })();
            });
            return function () {
                aborts.forEach(function (a) {
                    a();
                });
            };
        }
    }, [suggesters, getReferentiel, status]);
    return getSuggesterStatus;
}
exports.useSuggesters = useSuggesters;
