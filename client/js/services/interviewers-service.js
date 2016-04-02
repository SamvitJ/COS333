app.factory('Interviewer', function($resource) {
  return $resource('/api/interviewers');
});