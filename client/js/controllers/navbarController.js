var navbarController = angular.module('navbarController', []);

navbarController.controller('NavbarCtrl', ['$scope', '$sessionStorage', function ($scope, $sessionStorage) {

   $scope.loggedIn = $sessionStorage.loggedIn;
   $scope.name = $sessionStorage.name;
   $scope.isInterviewer = $sessionStorage.isInterviewer;
   console.log("isInterviewer " + $scope.isInterviewer);
   console.log($scope.loggedIn);

  $scope.logout = function() {
    $sessionStorage.name = "";
    $sessionStorage.email = "";
    $sessionStorage.google_token = "";
    $sessionStorage.image_url = "";
    $sessionStorage.school = "";
    $sessionStorage.grad = "";
    $sessionStorage.loggedIn = false;
    $sessionStorage.isInterviewer = false;
      
    
    window.location.href="#/";
    location.reload();
  }
  
}]);
