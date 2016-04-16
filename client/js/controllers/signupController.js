var signupController = angular.module('signupController', []);

signupController.controller('SignupCtrl', ['$scope', 'User', function ($scope, User) {

  // Scheduler init
  scheduler.locale.labels.new_event = 'Available';
  scheduler.config.icons_select=["icon_delete"];
  scheduler.config.time_step = 60;

  scheduler.init('scheduler_here', new Date(), "week");

  // scheduler.attachEvent("onEventAdded", function(id,ev){
  //   console.log(id)
  //   // console.log(ev.start_date)
  //   // console.log(ev.end_date)
  //   // console.log(typeof(ev.start_date))
  //   // console.log(Date(ev.start_date))
  //   // console.log(typeof(new Date(ev.start_date)))
  //   // scheduler.getEvent(id).readonly = true;
  // });

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
    // get scheduler events
    var availability = []
    scheduler.getEvents().forEach(function(event) {
      availability.push({
        id: event.id,
        start: event.start_date,
        end: event.end_date
      })
    });

    var user = new User({
      "name": $scope.name,
      "email": $scope.email,
      "google_token": $scope.google_token,

      "school": $scope.school,
      "headline": $scope.headline,
      "rate": $scope.rate,
      "availability": availability,
      "bio": $scope.bio
    });
    user.$save(function (result) {
      $scope.name = '';
      $scope.email = '';
      $scope.google_token = '';

      $scope.school = '';
      $scope.headline = '';
      $scope.rate = '';
      $scope.availability = '';
      $scope.bio = '';

      window.location.href="/users";
    });
  };

}]);