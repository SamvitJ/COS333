var interviewersListController = angular.module('interviewersListController', []);

interviewersListController.controller('IntListCtrl', ['$scope', 'Interviewer', function ($scope, Interviewer) {

  Interviewer.query(function (results) {
    $scope.interviewers = results;
  });

  $scope.createInterviewer = function () {
    var interviewer = new Interviewer({
        "name": $scope.interviewerName,
        "school": $scope.interviewerSchool,
        "headline": $scope.interviewerHeadline
    });
    interviewer.$save(function (result) {
      $scope.interviewers.push(result);
      $scope.interviewerName = '';
      $scope.interviewerSchool = '';
      $scope.interviewerHeadline = '';
    });
  }
}]);
