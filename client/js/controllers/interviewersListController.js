var interviewersListController = angular.module('interviewersListController', []);

interviewersListController.controller('IntListCtrl', ['$scope', '$sessionStorage', 'User', 'Interview', function ($scope, $sessionStorage, User, Interview) {

	Interview.interviews.query({id: "572050502b0ab9e44b5eaae8"}, function(results) {
		// console.log(results)
	});

  User.interviewers.query(function (results) {
  	var currentTime = new Date();
  	results.forEach(function(interviewer) {

			var schedule = [];
			for (i = 0; i < 7; i++) {
				var date = new Date(currentTime);
				date.setDate(date.getDate() + i)
				schedule.push({
					day: date.toLocaleDateString('en-us', {weekday:'long', month:'short', day:'numeric'}),
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
						timeDisplayed = '12 am'
					} else if (hour < 12) {
						timeDisplayed = hour.toString() + 'am'
					} else if (hour == 12) {
						timeDisplayed = '12 pm'
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


	$scope.schedule = {
		selectedInterviewer: {},
		selectedTime: {}
	};

	$scope.scheduleInterview = function(ev) {
		// update availability
		var schedule = $scope.schedule.selectedInterviewer.availability;
		console.log(schedule)
		var eventID = $scope.schedule.selectedTime.id;
		var hour = $scope.schedule.selectedTime.time;
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
			interviewer: $scope.schedule.selectedInterviewer._id
    });
    interview.$save(function (result) {
      console.log("interview scheduled!")

      // Update Interviewer's availability
      $scope.schedule.selectedInterviewer.availability = schedule;

      // Save to interviewer and interviewee's histories
      var interviewerHistory = $scope.schedule.selectedInterviewer.interviews;
      interviewerHistory.push(interview._id)

      // Send put request to update
      $scope.schedule.selectedInterviewer.$update()
    });


	}

	$scope.updateSelectedInterviewer = function(index) {
		$scope.schedule.selectedInterviewer = $scope.interviewers[index];
	}

}]);
