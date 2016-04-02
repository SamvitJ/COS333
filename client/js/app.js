var app = angular.module('coachApp', ['ngResource', 'ngRoute',
   'interviewersController']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/interviewers', {
        templateUrl: 'partials/interviewer-list.html',
        controller: 'IntListCtrl'
      }).
      when('/interviewers/:interviewerId', {
        templateUrl: 'partials/interviewer-detail.html',
        controller: 'IntDetailCtrl'
      }).
      otherwise({
        redirectTo: '/interviewers'
      });
  }]);