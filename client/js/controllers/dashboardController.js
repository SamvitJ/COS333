var dashboardController = angular.module('dashboardController', []);
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

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

    events = [
      {id:1, text:"Available", start_date:"05/04/2016 14:00", end_date:"05/04/2016 16:00"},
      {id:2, text:"Available", start_date:"05/06/2016 14:00", end_date:"05/06/2016 16:00"}
    ];
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
  $scope.isInterviewer=$sessionStorage.isInterviewer;
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  var currentTime = new Date();
  Interview.interviews.query({google_token: $sessionStorage.google_token}, function(results) {
  	results.forEach(function(result) {
  		var start = new Date(result.start);

      if (start > currentTime) {
        result.isIncomplete = true;

        result.start = days[start.getDay()] + ', '
        if (isSafari) {
          result.start = result.start + start.toLocaleDateString('en-us', {weekday:'long', month:'short', day:'numeric'}).slice(0,-6);
          result.start = result.start + ', ' + start.toLocaleTimeString().slice(0,-10) + ' ' + start.toLocaleTimeString().slice(-6,-4);
        } else if (isChrome) {
          result.start = result.start + start.toLocaleDateString('en-us', {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
        }
        result.isInterviewer = result.interviewer == $sessionStorage.google_token ? true : false;

        var timeDiff = start.getTime() - currentTime.getTime();
        var diffHours = Math.ceil(timeDiff / (1000 * 3600));
        if (diffHours <= 1) {
          result.isReady = true;
        }
      }
  	})
		$scope.interviews = results;
	});

  $scope.joinInterview = function() {
    window.open($scope.hangout.url, "_blank", "height=750,width=1000");
  };

  // $scope.logout = function() {
  //   $sessionStorage.name = "";
  //   $sessionStorage.email = "";
  //   $sessionStorage.google_token = "";
  //   $sessionStorage.image_url = "";
  //   $sessionStorage.school = "";
  //   $sessionStorage.grad = "";
  //   $sessionStorage.loggedIn = false;
  //   $sessionStorage.isInterviewer = false;
      
    
  //   window.location.href="#/";
  //   location.reload();
  // }
}]);
