var interviewersListController = angular.module('interviewersListController', []);

interviewersListController.controller('IntListCtrl', ['$scope', '$resource', function ($scope, $resource) {
  var Interviewer = $resource('/api/interviewers');

  Interviewer.query(function (results) {
    $scope.interviewers = results;
  });

}]);
