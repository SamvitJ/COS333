var interviewersDetailController = angular.module('interviewersDetailController', []);

interviewersDetailController.controller('IntDetailCtrl', ['$scope', '$routeParams',
  function ($scope, $routeParams) {
    $scope.interviewerName = $routeParams.interviewerName;
}]);