"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var formateDate = function formateDate(time) {
  if (!time) return '';
  var date = new Date(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  var day = date.getDate();
  day = day < 10 ? '0' + day : day;
  var hour = date.getHours();
  hour = hour < 10 ? '0' + hour : hour;
  var Minute = date.getMinutes();
  Minute = Minute < 10 ? '0' + Minute : Minute;
  var Second = date.getSeconds();
  Second = Second < 10 ? '0' + Second : Second;
  return year + '-' + month + '-' + day + ' ' + hour + ':' + Minute + ':' + Second;
};

var _default = formateDate;
exports["default"] = _default;