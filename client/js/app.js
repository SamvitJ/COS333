var app = angular.module('coachApp', ['ngResource', 'ngRoute',
   'interviewersListController', 'interviewersDetailController', 
   'preinterviewController', 'signupController', 'dashboardController',
   'landingController', 'createInterviewerController',
   'preinterviewServices', 'userServices']);

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
      // when('/login', {
      //   templateUrl: 'partials/login.html',
      //   controller: 'SignupCtrl'
      // }).
      // when('/register', {
      //   templateUrl: 'partials/login.html#toregister',
      //   controller: 'SignupCtrl'
      // }).
      when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardCtrl'
      }).
      otherwise({
        redirectTo: '/',
        templateUrl: 'partials/landing.html',
        controller: 'LandingCtrl'  
      });
  }]);
