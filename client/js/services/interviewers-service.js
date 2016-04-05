app.factory('Interviewer', function($resource) {
	return $resource('/api/interviewers', {}, {
		query: {method:'GET', params:{}, isArray:true}
	});
});
