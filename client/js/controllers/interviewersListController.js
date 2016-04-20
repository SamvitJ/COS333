var interviewersListController = angular.module('interviewersListController', []);

interviewersListController.controller('IntListCtrl', ['$scope', 'User', function ($scope, User) {

  User.interviewers.query(function (results) {
    $scope.interviewers = results;
  });

}]);
