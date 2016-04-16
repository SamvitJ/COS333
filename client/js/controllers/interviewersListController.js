var interviewersListController = angular.module('interviewersListController', []);

interviewersListController.controller('IntListCtrl', ['$scope', 'User', function ($scope, User) {

  User.queryInterviewers(function (results) {
    $scope.interviewers = results;
  });

}]);
