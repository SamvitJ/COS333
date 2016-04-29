var navbarController = angular.module('navbarController', []);

navbarController.controller('NavbarCtrl', ['$scope', '$sessionStorage', function ($scope, $sessionStorage) {

   $scope.loggedIn = $sessionStorage.loggedIn;
   $scope.name = $sessionStorage.name;
   console.log($scope.loggedIn);

}]);
