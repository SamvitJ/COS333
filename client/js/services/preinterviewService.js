var preinterviewServices = angular.module('preinterviewServices', ['ngResource']);

preinterviewServices.factory('Hangout', function($resource) {
	return $resource('/api/hangouts', {}, {
		query: {method:'GET', params:{}, isArray:true}
	});
});