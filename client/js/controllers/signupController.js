var signupController = angular.module('signupController', []);

signupController.controller('SignupCtrl', ['$scope', 'User', function ($scope, User) {

  window.getGoogleData = function (googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    var authResp = googleUser.getAuthResponse();

    $scope.name = profile.getName();
    $scope.email = profile.getEmail();
    $scope.google_token = authResp.id_token;

    console.log('Full Name: ' + profile.getName());
    console.log("Email: " + profile.getEmail());
    console.log("ID Token: " + authResp.id_token);
  };

  $scope.createUser = function (credentials) {

    var user = new User.all({
      "name": $scope.name,
      "email": $scope.email,
      "google_token": $scope.google_token,
      "interviewer": true
    });
    user.$save(function (result) {
      $scope.name = '';
      $scope.email = '';
      $scope.google_token = '';

      window.location.href="/users";
    });

      console.log('createUser() called');
  };



}]);



// Signup Popup controller
// var signupController = angular.module('signupController', ['ui.bootstrap']);

// signupController.controller('SignupCtrl', ['$scope','$modal', function ($scope, $modal) {

//    $scope.open = function () {
//       var modalInstance = $modal.open({
//       templateUrl: 'partials/signup.html',
//    });
// }
// }
// ]
// );