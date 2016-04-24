var interviewerServices = angular.module('userServices', ['ngResource']);

interviewerServices.factory('User', function($resource) {
   return {
      interviewers: $resource('/api/interviewers/:id', { id: '@_id' }, {
         query: {method:'GET', params:{}, isArray:true},
         update: {method:'PUT'}
      }),

      all: $resource('/api/users')
   }
});

