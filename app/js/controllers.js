'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
  .controller('AddController', ['$scope', 'ResponseTimesData', '$location',
    function ($scope, ResponseTimesData, $location) {
      $scope.bins = 20;

      $scope.addDatum = function () {
        ResponseTimesData.push($scope.datum);
        $location.path('/');
      };
  }])
  .controller('ListController', ['$scope', 'ResponseTimesData',
    function ($scope, ResponseTimesData) {
      $scope.data = ResponseTimesData;
      $scope.editing = false;
      $scope.bins = 20;

      $scope.deleteDatum = function (datum) {
        $scope.data.splice($scope.data.indexOf(datum), 1);
        if ($scope.datum === datum) {
          delete $scope.datum;
        }
      };

      $scope.updateDone = function () {
        $scope.editing = false;
      };

      $scope.populateUpdateForm = function (datum) {
        $scope.editing = true;
        $scope.datum = datum;
      };

      $scope.showHistogram = function (datum) {
        $scope.datum = datum;
      };
  }]);
