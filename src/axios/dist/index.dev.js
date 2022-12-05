"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonp = _interopRequireDefault(require("jsonp"));

var _axios = _interopRequireDefault(require("axios"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
          if (response.status == 'success') {
            resolve(response);
          } else {
            reject(response.messsage);
          }
        });
      });
    }
  }, {
    key: "ajax",
    value: function ajax(options) {
      var loading;

      if (options.data && options.data.isShowLoading !== false) {
        loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';
      }

      var baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
      return new Promise(function (resolve, reject) {
        (0, _axios["default"])({
          url: options.url,
          method: 'get',
          baseURL: baseApi,
          timeout: 5000,
          params: options.data && options.data.params || ''
        }).then(function (response) {
          if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'none';
          }

          if (response.status == '200') {
            var res = response.data;

            if (res.code == '0') {
              resolve(res);
            } else {
              _antd.Modal.info({
                title: "提示",
                content: res.msg
              });
            }
          } else {
            reject(response.data);
          }
        });
      });
    }
  }]);

  return Axios;
}();

exports["default"] = Axios;