var createInterviewerController = angular.module('createInterviewerController', []);

createInterviewerController.controller('CreateIntCtrl',
    ['$scope', '$resource', function ($scope, $resource) {

  var Interviewer = $resource('/api/interviewers');

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
