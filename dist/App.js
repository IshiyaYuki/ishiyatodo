"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

require("./App.css");

var _Todo = _interopRequireDefault(require("./Todo.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function App() {
  return _react["default"].createElement("div", {
    className: "App"
  }, _react["default"].createElement("body", null, _react["default"].createElement("div", {
    className: "todos"
  }, _react["default"].createElement(_Todo["default"], null))));
}

var _default = App;
exports["default"] = _default;