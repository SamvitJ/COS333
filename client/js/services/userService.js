var interviewerServices = angular.module('userServices', ['ngResource']);

interviewerServices.factory('User', function($resource) {
	return $resource('/api/users', {}, {
		query: {method:'GET', params:{}, isArray:true},
      queryInterviewers: {method:'GET', params:{interviewer:true}, isArray:true}
	});
});
