var interviewersListController = angular.module('interviewersListController', []);
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

interviewersListController.controller('IntListCtrl', ['$scope', '$sessionStorage', 'User', 'Interview', function ($scope, $sessionStorage, User, Interview) {
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  User.interviewers.query(function (results) {
  	var currentTime = new Date((new Date()).setHours(0,0,0,0))
  	results.forEach(function(interviewer) {

			var schedule = [];
			for (i = 0; i < 7; i++) {
				var date = new Date(currentTime);
				date.setDate(date.getDate() + i)
				schedule.push({
					day: isSafari ?
						days[date.getDay()] + ', ' + date.toLocaleDateString('en-us', {weekday:'long', month:'short', day:'numeric'}).slice(0,-6): 
						date.toLocaleDateString('en-us', {weekday:'long', month:'short', day:'numeric'}),
					hours: []
				});
			}

			interviewer.availability.forEach(function(time) {
				var start = new Date(time.start)

				//store as available hours e.g. [4, 6, 7, 12, 13, 14] is 4-5am, 6-8am, 12pm-3pm
				var timeDiff = start.getTime() - currentTime.getTime();
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // milliseconds

				//check if date is within a one week range
				if (diffDays > 0 && diffDays <= 7) {
					var hour = start.getHours();
					var timeDisplayed = ''
					if (hour == 0) {
						timeDisplayed = '12am'
					} else if (hour < 12) {
						timeDisplayed = hour.toString() + 'am'
					} else if (hour == 12) {
						timeDisplayed = '12pm'
					} else {
						timeDisplayed = (hour - 12).toString() + 'pm'
					}
					schedule[diffDays - 1].hours.push({id: time.id, time: start.getHours(), timeDisplayed: timeDisplayed});
				}
			});

			interviewer.schedule = schedule;
  	})

    $scope.interviewers = results;
  });


	$scope.interview = {
		selectedInterviewer: {},
		selectedTime: {},
		topic: '',
		description: ''
	};

	$scope.scheduleInterview = function(ev) {
		// update availability
		var schedule = $scope.interview.selectedInterviewer.availability;
		var eventID = $scope.interview.selectedTime.id;
		var hour = $scope.interview.selectedTime.time;
		var index = -1;
		for (var i = 0; i < schedule.length; i++) {
			start = new Date(schedule[i].start);
			if (schedule[i].id == eventID && start.getHours() == hour) {
				index = i;
			}
		}
		var scheduledTime = schedule.splice(index, 1)[0];

		// Add to interviews table
		var interview = new Interview.all({
			complete: false,
			start: scheduledTime.start,
			end: scheduledTime.end,
			topic: $scope.interview.topic,
			description: $scope.interview.description,
			interviewer: $scope.interview.selectedInterviewer.google_token,
			interviewerName: $scope.interview.selectedInterviewer.name,
			interviewee: $sessionStorage.google_token
    });
    interview.$save(function (result) {
      console.log("interview scheduled!")

      // Update Interviewer's availability
      $scope.interview.selectedInterviewer.availability = schedule;

      // Save to interviewer and interviewee's histories
      var interviewerHistory = $scope.interview.selectedInterviewer.interviews;
      interviewerHistory.push(interview._id)

      // Send put request to update
      $scope.interview.selectedInterviewer.$update()

      // Janky solution but works - close modal with click and redirect
      $('.close').click();
      window.location.href="#/dashboard";
    });


	}

	$scope.updateSelectedInterviewer = function(index) {
		$scope.interview.selectedInterviewer = $scope.interviewers[index];
	}

}]);
