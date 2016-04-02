var interviewersListController = angular.module('interviewersListController', []);

interviewersListController.controller('IntListCtrl', ['$scope', '$resource', function ($scope, $resource) {
  var Interviewer = $resource('/api/interviewers');

  Interviewer.query(function (results) {
    $scope.interviewers = results;
  });

  $scope.interviewers = []

  $scope.createInterviewer = function () {
    console.log("createInterviewer")
    var interviewer = new Interviewer({
        "name": $scope.interviewerName,
        "school": $scope.interviewerSchool,
        "headline": $scope.interviewerHeadline
    });
    interviewer.$save(function (result) {
      console.log("save")
      $scope.interviewers.push(result);
      $scope.interviewerName = '';
      $scope.interviewerSchool = '';
      $scope.interviewerHeadline = '';
    });
  }
}]);
