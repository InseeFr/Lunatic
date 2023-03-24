"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _commons = require("../commons");

var _notification = _interopRequireDefault(require("./html/notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function SuggesterNotification() {}

var _default = (0, _commons.createCustomizableLunaticField)(SuggesterNotification, 'SuggesterNotification');

exports["default"] = _default;