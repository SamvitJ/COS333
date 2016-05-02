var dashboardController = angular.module('dashboardController', []);

dashboardController.controller('DashboardCtrl', ['$scope', '$sessionStorage', 'Interview', 'User', 'Hangout', '$resource', function ($scope, $sessionStorage, Interview, User, Hangout, $resource) {
	Hangout.query(function (result) {
    $scope.hangout = result[0];
    // $scope.hangout = "https://talkgadget.google.com/hangouts/_/kw2pjp5vy5golkmraxaeczk6aue?hl=en"
  });

  var events = [];
  User.interviewer.query({google_token: $sessionStorage.google_token}, function(result) {
  	var availability = result.availability;

  	var options = {year:'numeric',month:'numeric',day:'numeric',hour: '2-digit', minute: '2-digit', hour12: false};
  	var idCount = 0;
  	availability.forEach(function(event) {
  		var start = (new Date(event.start)).toLocaleString('en-us', options).replace(',', '');
  		var end = (new Date(event.end)).toLocaleString('en-us', options).replace(',', '');
  		events.push({
  			id: idCount,
  			text: "Available",
  			start_date: start,
  			end_date: end
  		})
  		idCount++;
  	});
  });

  scheduler.locale.labels.new_event = 'Available';
  scheduler.config.icons_select=["icon_delete"];
  scheduler.config.time_step = 60;

  $scope.openScheduler = function() {
      // Scheduler init
      setTimeout(function() {
        scheduler.init('scheduler_here', new Date(), "week");
        scheduler.parse(events, "json")
      }, 500);
  }

  $scope.user=$sessionStorage.name;
  $scope.image_url=$sessionStorage.image_url;

  Interview.interviews.query({google_token: $sessionStorage.google_token}, function(results) {
  	results.forEach(function(result) {
  		var start = new Date(result.start);
  		result.start = start.toLocaleDateString('en-us', {weekday:'long', month:'short', day:'numeric', hour:'2-digit', minute: '2-digit'});

      result.isInterviewer = result.interviewer == $sessionStorage.google_token ? true : false;
  	})
		$scope.interviews = results;
	});
}]);
