var interviewersListController = angular.module('interviewersListController', []);

interviewersListController.controller('IntListCtrl', ['$scope', 'User', function ($scope, User) {

  User.interviewers.query(function (results) {
    $scope.interviewers = results;

    //hard coded data
	var availability = [
	    {
	        "id": 1461168524308,
	        "start": "2016-04-21T18:00:00.000Z",
	        "end": "2016-04-21T19:00:00.000Z"
	    },
	    {
	        "id": 1461168524309,
	        "start": "2016-04-27T09:00:00.000Z",
	        "end": "2016-04-22T20:00:00.000Z"
	    },
	    {
	        "id": 1461168524310,
	        "start": "2016-04-28T20:00:00.000Z",
	        "end": "2016-04-23T21:00:00.000Z"
	    }
	];

	var currentTime = new Date();
	$scope.interviewers.forEach(function(interviewer) {
		schedule = [];
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
				schedule[diffDays - 1].push(start.getHours())
			}
		});
		interviewer.availability = schedule;
	});
  });

}]);
