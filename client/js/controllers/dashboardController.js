var dashboardController = angular.module('dashboardController', []);

dashboardController.controller('DashboardCtrl', ['$scope', '$sessionStorage', 'Interview', '$resource', function ($scope, $sessionStorage, Interview, $resource) {

  $scope.user=$sessionStorage.name;

  Interview.interviews.query({google_token: $sessionStorage.google_token}, function(results) {
		$scope.interviews = results;
		// console.log(results[0])
	});
}]);
