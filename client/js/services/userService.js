var interviewerServices = angular.module('userServices', ['ngResource']);

interviewerServices.factory('User', function($resource) {
	return $resource('/api/interviewers', {}, {
		query: {method:'GET', params:{}, isArray:true}
	});
});
