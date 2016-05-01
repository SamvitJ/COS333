var registerController = angular.module('registerController', []);

registerController.controller('RegisterCtrl', ['$scope', '$sessionStorage', 'User', function ($scope, $sessionStorage, User) {

  scheduler.locale.labels.new_event = 'Available';
  scheduler.config.icons_select=["icon_delete"];
  scheduler.config.time_step = 60;

  $scope.openScheduler = function() {
      // Scheduler init
      setTimeout(function() {
        scheduler.init('scheduler_here', new Date(), "week");
      }, 500);
  }

  $scope.createUser = function (credentials) {
    // get scheduler events
    var availability = []
    scheduler.getEvents().forEach(function(event) {
      var start_date = new Date(event.start_date);
      var end_date = new Date(event.end_date);

      while (start_date < end_date) {
        cur_start = new Date(start_date);
        start_date.setHours(start_date.getHours() + 1)
        cur_end = new Date(start_date)

        availability.push({
          id: event.id,
          start: cur_start,
          end: cur_end
        });
      }
    });

    var user = new User.all({
      "name": $sessionStorage.name,
      "email": $sessionStorage.email,
      "google_token": $sessionStorage.google_token,
      "image_url": $sessionStorage.image_url,
      "interviewer": true, 
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

      $sessionStorage.isInterviewer=true;
      location.reload();
    });

   window.location.href="#/dashboard";
  };

}]);