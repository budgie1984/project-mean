var tabletApp = angular.module('tabletApp');

tabletApp.controller('createContainerController',
    function($scope, $rootScope, $location, containerService) {
      
      $scope.createContainer = function(container) {
      console.log(container);
        containerService.createContainer(container)
        .success(function(data) {
            $scope.container = data;
            console.log("Container added to database", $scope.container);
        })
        .error(function(err) {
          $location.path("./home");
        });
      };




});
