var app = angular.module('coachApp', ['ngResource', 'ngRoute',
   'interviewersController']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/interviewers', {
        templateUrl: 'partials/interviewer-list.html',
        controller: 'IntListCtrl'
      }).
      when('/interviewers/:interviewerName', {
        templateUrl: 'partials/interviewer-detail.html',
        controller: 'IntDetailCtrl'
      }).
      when('/preinterview', {
        templateUrl: 'partials/preinterview.html',
        // TODO: CHANGE THIS
        controller: 'IntDetailCtrl'  
      }).
      otherwise({
        redirectTo: '/',
        templateUrl: 'partials/landing.html',
         // TODO: CHANGE THIS
        controller: 'IntDetailCtrl'  
      });
  }]);