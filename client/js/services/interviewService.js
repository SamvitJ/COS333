var interviewServices = angular.module('interviewServices', ['ngResource']);

interviewServices.factory('Interview', function($resource) {
   return {
      interviews: $resource('/api/interviews', {}, {
         query: {method:'GET', params:{}, isArray:true},
         update: {method:'PUT'}
      }),

      all: $resource('/api/interviews')
   }
});

