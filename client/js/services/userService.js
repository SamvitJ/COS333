var interviewerServices = angular.module('userServices', ['ngResource']);

interviewerServices.factory('User', function($resource) {
   return {
      interviewers: $resource('/api/interviewers', {}, {
         query: {method:'GET', params:{}, isArray:true}
      }),

      all: $resource('/api/users')
   }
});

