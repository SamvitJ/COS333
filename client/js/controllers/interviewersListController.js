var interviewersListController = angular.module('interviewersListController', []);

interviewersListController.controller('IntListCtrl', ['$scope', 'User', function ($scope, User) {

  User.interviewers.query(function (results) {
  	var currentTime = new Date();
  	results.forEach(function(interviewer) {
  		var availability = interviewer.availability;

		var schedule = [];
		for (i = 0; i < 7; i++) {
			schedule.push([]);
		}

		availability.forEach(function(time) {
			var start = new Date(time.start)

			//store as available hours e.g. [4, 6, 7, 12, 13, 14] is 4-5am, 6-8am, 12pm-3pm
			var timeDiff = start.getTime() - currentTime.getTime();
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // milliseconds

			//check if date is within a one week range
			if (diffDays > 0 && diffDays <= 7) {
				schedule[diffDays - 1].push({id: time.id, time: start.getHours()})
			}
		});

		interviewer.schedule = schedule;
  	})
    $scope.interviewers = results;
    $scope.schedule = {
    	selectedInterviewer: {},
    	selectedTime: {}

    };

	$scope.scheduleInterview = function(ev) {
		console.log($scope.schedule.selectedInterviewer);
		console.log($scope.schedule.selectedTime);
	}

	$scope.updateSelectedInterviewer = function(index) {
		$scope.schedule.selectedInterviewer = $scope.interviewers[index];
	}

  });

}]);
