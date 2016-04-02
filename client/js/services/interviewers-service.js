app.factory('Interviewer', function($resource) {
  return $resource('/api/interviewers');
});

// app.factory('Interviewers', ['$resource',
// 	function($resource) {
// 		return $resource('api/interviewers');
// 	}
// ]);

