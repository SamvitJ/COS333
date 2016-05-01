var dashboardController = angular.module('dashboardController', []);

dashboardController.controller('DashboardCtrl', ['$scope', '$sessionStorage', 'Interview', 'User', '$resource', function ($scope, $sessionStorage, Interview, User, $resource) {
  User.interviewer.query({google_token: $sessionStorage.google_token}, function(result) {
  	console.log(result)
  });

  scheduler.locale.labels.new_event = 'Available';
  scheduler.config.icons_select=["icon_delete"];
  scheduler.config.time_step = 60;

  $scope.openScheduler = function() {
      // Scheduler init
      setTimeout(function() {
        scheduler.init('scheduler_here', new Date(), "week");
      }, 500);
  }

  $scope.user=$sessionStorage.name;
  $scope.image_url=$sessionStorage.image_url;

  Interview.interviews.query({google_token: $sessionStorage.google_token}, function(results) {
  	results.forEach(function(result) {
  		var start = new Date(result.start);
  		result.start = start.toLocaleDateString('en-us', {weekday:'long', month:'short', day:'numeric', hour:'2-digit', minute: '2-digit'});
  	})
		$scope.interviews = results;
	});
}]);
