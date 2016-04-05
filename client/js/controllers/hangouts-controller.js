app.controller('hangoutsController', ['$scope', '$resource', function ($scope, $resource) {
  
  Hangout.query(function (result) {
    $scope.hangout = result[0];
  });

}]);