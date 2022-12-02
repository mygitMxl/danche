"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonp = _interopRequireDefault(require("jsonp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import axios from 'axios'
// import { Modal } from 'antd'
var Axios =
/*#__PURE__*/
function () {
  function Axios() {
    _classCallCheck(this, Axios);
  }

  _createClass(Axios, null, [{
    key: "jsonp",
    value: function jsonp(options) {
      return new Promise(function (resolve, reject) {
        (0, _jsonp["default"])(options.url, {
          param: 'callback'
        }, function (err, response) {
          if (response.status === 'success') {
            resolve(response);
          } else {
            reject(response.messsage);
          }
        });
      });
    }
  }]);

  return Axios;
}();

exports["default"] = Axios;