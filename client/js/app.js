var app = angular.module('coachApp', ['ngResource', 'ngRoute',
   'interviewersListController', 'interviewersDetailController', 
   'preinterviewController', 'loginController', 'landingController',
   'createInterviewerController', 'interviewerServices', 
   'preinterviewServices']);

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
        controller: 'PreIntCtrl'  
      }).
      when('/createInterviewer', {
        templateUrl: 'partials/create-interviewer.html',
        controller: 'CreateIntCtrl'  
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      otherwise({
        redirectTo: '/',
        templateUrl: 'partials/landing.html',
        controller: 'LandingCtrl'  
      });
  }]);
