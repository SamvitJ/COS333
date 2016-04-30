var dashboardController = angular.module('dashboardController', []);

dashboardController.controller('DashboardCtrl', ['$scope', '$sessionStorage', 'Interview', '$resource', function ($scope, $sessionStorage, Interview, $resource) {

  $scope.user=$sessionStorage.name;

  Interview.interviews.query({google_token: $sessionStorage.google_token}, function(results) {
  	results.forEach(function(result) {
  		var start = new Date(result.start);
  		result.start = start.toLocaleDateString('en-us', {weekday:'long', month:'short', day:'numeric', hour:'2-digit', minute: '2-digit'});
  	})
		$scope.interviews = results;
	});
}]);
