'use strict';

/* Filters */

angular.module('myApp.filters', [])
  .filter('interpolate', ['version',
    function (version) {
      return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
      };
  }])
  .filter('dottedLimitTo', function () {
    return function (text, limit) {
      if (!text) return '';
      if (text.length <= limit) {
        return text;
      } else {
        return text.substr(0, limit - 3) + '...';
      }
    };
  });
