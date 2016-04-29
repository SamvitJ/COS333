var interviewersListController = angular.module('interviewersListController', []);

interviewersListController.controller('IntListCtrl', ['$scope', '$sessionStorage', 'User', function ($scope, $sessionStorage, User) {

  User.interviewers.query(function (results) {
    $scope.interviewers = results;
  });

}]);
