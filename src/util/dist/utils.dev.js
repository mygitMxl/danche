"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pagination = exports.formateDate = void 0;

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

exports.formateDate = formateDate;

var pagination = function pagination(data, callback) {
  return {
    onChange: function onChange(current) {
      callback(current);
    },
    current: data.result.page,
    pageSize: data.result.page_size,
    total: data.result.total_count,
    showTotal: function showTotal() {
      return "\u5171".concat(data.result.total_count, "\u6761");
    },
    showQuickJumper: true
  };
};

exports.pagination = pagination;