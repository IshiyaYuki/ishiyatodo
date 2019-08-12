"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./todo.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Todo =
/*#__PURE__*/
function (_Component) {
  _inherits(Todo, _Component);

  function Todo(props) {
    var _this;

    _classCallCheck(this, Todo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Todo).call(this, props));
    _this.state = {
      todo: []
    };
    _this.addTodo = _this.addTodo.bind(_assertThisInitialized(_this));
    _this.fetchResponse = _this.fetchResponse.bind(_assertThisInitialized(_this));
    return _this;
  } // 初期値の設定


  _createClass(Todo, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.fetchResponse();
    } // リストの更新

  }, {
    key: "fetchResponse",
    value: function fetchResponse() {
      var _this2 = this;

      fetch("http://develop.ic-cd.info/ishiya/test/db.json/").then(function (res) {
        return res.json();
      }).then(function (res) {
        _this2.setState({
          todo: res
        });
      });
    } // 新規追加

  }, {
    key: "addTodo",
    value: function addTodo() {
      var _this3 = this;

      fetch("http://develop.ic-cd.info/ishiya/test/db.json/", {
        method: 'POST',
        body: JSON.stringify({
          title: this.refs.newText.value,
          times: new Date().toLocaleString()
        }),
        headers: new Headers({
          'Content-type': 'application/json'
        })
      }).then(function () {
        // リストの更新
        _this3.fetchResponse(); // 値の初期化


        _this3.refs.newText.value = "";
      });
    } // 編集機能

  }, {
    key: "updateTodo",
    value: function updateTodo(todo) {
      var _this4 = this;

      fetch("http://develop.ic-cd.info/ishiya/test/db.json/" + todo.id, {
        method: 'PUT',
        body: JSON.stringify({
          id: todo.id,
          title: todo.title,
          times: todo.times
        }),
        headers: new Headers({
          'Content-type': 'application/json'
        })
      }).then(function () {
        // リストの更新
        _this4.fetchResponse();
      });
    } // 削除機能

  }, {
    key: "deleteTodo",
    value: function deleteTodo(todo) {
      var _this5 = this;

      fetch('"http://develop.ic-cd.info/ishiya/test/db.json/"' + todo.id, {
        method: 'DELETE'
      }).then(function () {
        var todos = _this5.state.todo.filter(function (item) {
          return item.id !== todo.id;
        }); // 保存


        _this5.setState({
          todo: todos
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return _react["default"].createElement("div", {
        className: "wrap"
      }, _react["default"].createElement("h1", {
        className: "title"
      }, "TODO"), _react["default"].createElement("form", {
        action: "./confirm.php",
        method: "post"
      }, _react["default"].createElement("ul", {
        className: "task"
      }, this.state.todo.map(function (todo) {
        return _react["default"].createElement("li", {
          key: todo.id
        }, _react["default"].createElement("input", {
          type: "text",
          defaultValue: todo.title,
          onChange: function onChange(e) {
            return todo.title = e.target.value;
          },
          name: "todo[]",
          value: todo.title
        }), _react["default"].createElement("input", {
          type: "button",
          value: "\u7DE8\u96C6",
          onClick: function onClick() {
            return _this6.updateTodo(todo);
          }
        }), _react["default"].createElement("input", {
          type: "button",
          value: "\u524A\u9664",
          onClick: function onClick() {
            return _this6.deleteTodo(todo);
          }
        }), _react["default"].createElement("br", null), _react["default"].createElement("input", {
          className: "hide",
          type: "text",
          name: "times[]",
          value: todo.times
        }));
      })), _react["default"].createElement("input", {
        type: "text",
        ref: "newText"
      }), _react["default"].createElement("input", {
        type: "button",
        value: "\u8FFD\u52A0",
        onClick: this.addTodo
      }), _react["default"].createElement("div", {
        className: "mail_form"
      }, _react["default"].createElement("h2", null, "\u30E1\u30FC\u30EB\u9001\u4FE1\u30D5\u30A9\u30FC\u30E0"), _react["default"].createElement("p", null, "\u9001\u4FE1\u5148"), _react["default"].createElement("input", {
        type: "text",
        name: "to"
      }), _react["default"].createElement("p", null, "\u30E1\u30FC\u30EB\u306E\u30BF\u30A4\u30C8\u30EB"), _react["default"].createElement("input", {
        type: "text",
        name: "title"
      }), _react["default"].createElement("div", {
        className: "Listbox"
      }, _react["default"].createElement("p", null, "\u672C\u6587(TodoList)"), _react["default"].createElement("ul", {
        className: "todolist"
      }, this.state.todo.map(function (list) {
        return _react["default"].createElement("li", {
          key: list.id
        }, list.id, "\uFF1A", list.title, _react["default"].createElement("br", null), "Time: ", list.times);
      }))), _react["default"].createElement("p", null, _react["default"].createElement("input", {
        type: "submit",
        name: "send",
        value: "\u9001\u4FE1"
      })))));
    }
  }]);

  return Todo;
}(_react.Component);

var _default = Todo;
exports["default"] = _default;