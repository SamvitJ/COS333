var signupController = angular.module('signupController', []);

signupController.controller('SignupCtrl', ['$scope', 'User', function ($scope, User) {

  // Scheduler init
  scheduler.locale.labels.new_event = 'Available';
  scheduler.config.icons_select=["icon_delete"];
  scheduler.config.time_step = 60;

  scheduler.init('scheduler_here', new Date(), "week");

  var events = [
  {id:1, text:"Meeting",   start_date:"04/11/2016 14:00",end_date:"04/11/2016 17:00"},
  {id:2, text:"Conference",start_date:"04/15/2016 12:00",end_date:"04/18/2016 19:00"},
  {id:3, text:"Interview", start_date:"04/24/2016 09:00",end_date:"04/24/2016 10:00"}
  ];
  scheduler.parse(events, "json");//takes the name and format of the data source

  window.getGoogleData = function (googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    var authResp = googleUser.getAuthResponse();

    $scope.name = profile.getName();
    $scope.email = profile.getEmail();
    $scope.google_token = authResp.id_token;

    console.log('Full Name: ' + profile.getName());
    console.log("Email: " + profile.getEmail());
    console.log("ID Token: " + authResp.id_token);
  };

  $scope.createUser = function (credentials) {
    var user = new User({
      "name": $scope.name,
      "email": $scope.email,
      "google_token": $scope.google_token,

      "school": $scope.school,
      "headline": $scope.headline,
      "rate": $scope.rate,
      "calendar": $scope.calendar,
      "bio": $scope.bio
    });
    user.$save(function (result) {
      $scope.name = '';
      $scope.email = '';
      $scope.google_token = '';

      $scope.school = '';
      $scope.headline = '';
      $scope.rate = '';
      $scope.calendar = '';
      $scope.bio = '';

      window.location.href="/users";
    });
  };

}]);