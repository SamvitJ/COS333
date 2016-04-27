var interviewersListController = angular.module('interviewersListController', []);

interviewersListController.controller('IntListCtrl', ['$scope', 'User', 'Interview', function ($scope, User, Interview) {

  User.interviewers.query(function (results) {
  	var currentTime = new Date();
  	results.forEach(function(interviewer) {

			var schedule = [];
			for (i = 0; i < 7; i++) {
				schedule.push([]);
			}

			interviewer.availability.forEach(function(time) {
				var start = new Date(time.start)

				//store as available hours e.g. [4, 6, 7, 12, 13, 14] is 4-5am, 6-8am, 12pm-3pm
				var timeDiff = start.getTime() - currentTime.getTime();
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // milliseconds

				//check if date is within a one week range
				if (diffDays > 0 && diffDays <= 7) {
					schedule[diffDays - 1].push({id: time.id, time: start.getHours()});
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
