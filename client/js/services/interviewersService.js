var interviewerServices = angular.module('interviewerServices', ['ngResource']);

interviewerServices.factory('Interviewer', function($resource) {
	return $resource('/api/interviewers', {}, {
		query: {method:'GET', params:{}, isArray:true}
	});
});
