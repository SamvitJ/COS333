var interviewersListController = angular.module('interviewersListController', []);

interviewersListController.controller('IntListCtrl', ['$scope', 'User', function ($scope, User) {

  User.interviewers.query(function (results) {
    $scope.interviewers = results;





	var availability = [
	    {
	        "id": 1461168524308,
	        "start": "2016-04-21T18:00:00.000Z",
	        "end": "2016-04-21T20:00:00.000Z"
	    },
	    {
	        "id": 1461168524309,
	        "start": "2016-04-22T19:00:00.000Z",
	        "end": "2016-04-22T21:00:00.000Z"
	    },
	    {
	        "id": 1461168524310,
	        "start": "2016-04-23T20:00:00.000Z",
	        "end": "2016-04-23T22:00:00.000Z"
	    }
	];

	var currentTime = new Date();
	$scope.interviewers.forEach(function(interviewer) {
		// interviewer.availability = availability;

		availability.forEach(function(time) {
			var start = new Date(time.start)
			var end = new Date(time.end)
			//store as available hours e.g. [4, 6, 7, 12, 13, 14] is 4-5am, 6-8am, 12pm-3pm
			if (start > currentTime) {
				console.log(start.getHours())
			}
		});
	});
  });

  $scope.getDates = function (interviewer) {
  	console.log("getDates")
  	console.log(interviewer)
  } 




}]);
