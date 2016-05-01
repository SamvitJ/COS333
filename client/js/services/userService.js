var interviewerServices = angular.module('userServices', ['ngResource']);

interviewerServices.factory('User', function($resource) {
   return {
      interviewers: $resource('/api/interviewers', {}, {
         query: {method:'GET', params:{}, isArray:true},
         update: {method:'PUT'}
      }),

      interviewer: $resource('/api/interviewer', {}, {
      	query: {method:'GET', params:{}, isArray:false}
      }),

      all: $resource('/api/users')
   }
});

