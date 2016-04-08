var interviewersListController = angular.module('interviewersListController', []);

interviewersListController.controller('IntListCtrl', ['$scope', 'Interviewer', function ($scope, Interviewer) {

  Interviewer.query(function (results) {
    $scope.interviewers = results;
  });

}]);
