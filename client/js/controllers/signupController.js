var signupController = angular.module('signupController', []);

signupController.controller('SignupCtrl', ['$scope', '$sessionStorage', 'User', function ($scope, $sessionStorage, User) {

   $scope.$storage = $sessionStorage;

  window.getGoogleData = function (googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    var authResp = googleUser.getAuthResponse();

    $scope.name = profile.getName();
    $scope.email = profile.getEmail();
    $scope.google_token = authResp.id_token;
    $scope.image_url = profile.getImageUrl();

    if (profile.getImageUrl() ===  undefined) {
      console.log("if");
      $scope.image_url = "static/stockprofilephoto.jpg";
    }

    $sessionStorage.name = profile.getName();
    $sessionStorage.email = profile.getEmail();
    $sessionStorage.google_token = authResp.id_token;
    $sessionStorage.image_url = $scope.image_url;

    console.log('Full Name: ' + profile.getName());
    console.log("Email: " + profile.getEmail());
    console.log("ID Token: " + authResp.id_token);
    console.log("Image URL: " + $scope.image_url);
  };

  $scope.createUser = function (credentials) {

    var user = new User.all({
      "name": $scope.name,
      "email": $scope.email,
      "google_token": $scope.google_token,
      "image_url": $scope.image_url,
      "interviewer": false
    });
    user.$save(function (result) {
      $scope.name = '';
      $scope.email = '';
      $scope.google_token = '';
      $scope.image_url = '';
      
      $sessionStorage.loggedIn = true;
      location.reload();
    });


      window.location.href="#/dashboard";
      
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