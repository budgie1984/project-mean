var tabletApp = angular.module('tabletApp');

tabletApp.controller('homeController',
    function($scope, $rootScope, $location, tabletService) {
      
      $scope.addTablet = function(tablet) {
      console.log(tablet);
        tabletService.addTablet(tablet)
        .success(function(data) {
            $scope.tablet = data;
            console.log("Tablet added to database", $scope.tablet);
        })
        .error(function(err) {
          $location.path("./home");
        });
      };

    });
