var navbarController = angular.module('navbarController', []);

navbarController.controller('NavbarCtrl', ['$scope', '$sessionStorage', function ($scope, $sessionStorage) {

   $scope.loggedIn = $sessionStorage.loggedIn;
   $scope.name = $sessionStorage.name;
   $scope.isInterviewer = $sessionStorage.isInterviewer;
   console.log($scope.loggedIn);

}]);
