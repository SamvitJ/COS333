var dashboardController = angular.module('dashboardController', []);

dashboardController.controller('DashboardCtrl', ['$scope', '$sessionStorage', '$resource', function ($scope, $sessionStorage, $resource) {

   $scope.user=$sessionStorage.name;
}]);
