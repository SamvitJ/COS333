var signupController = angular.module('signupController', []);

signupController.controller('SignupCtrl', ['$scope', 'User', function ($scope, User) {

  $scope.createUser = function (credentials) {
    var user = new User({
      "name": $scope.name,
      "email": $scope.email,
      "google_token": $scope.google_token,

      "school": $scope.school,
      "headline": $scope.headline,
      "rate": $scope.rate,
      "calendar": $scope.calendar,
      "bio": $scope.bio
    });
    user.$save(function (result) {
      $scope.name = '';
      $scope.email = '';
      $scope.google_token = '';

      $scope.school = '';
      $scope.headline = '';
      $scope.rate = '';
      $scope.calendar = '';
      $scope.bio = '';
    });
  };
}]);