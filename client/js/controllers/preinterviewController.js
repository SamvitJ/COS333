var preinterviewController = angular.module('preinterviewController', []);

preinterviewController.controller('PreIntCtrl', ['$scope', 'Hangout', function ($scope, Hangout) {
  Hangout.query(function (result) {
    $scope.hangout = result[0];
  });
}]);
