app.controller('hangoutsController', ['$scope', '$resource', function ($scope, $resource) {
  var Interviewer = $resource('/api/hangouts');

  Interviewer.query(function (result) {
    $scope.hangout = result;
  });

}]);