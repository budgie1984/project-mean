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


    containerService.getContainers()
    .success(function(data) {
        console.log("called controller");
        console.log(data);
        let containers = data;
        $scope.containers = containers;
        console.log($scope.containers);
    })
    .error(function(err) {
        $location.path("./home");
    });

    $scope.viewContainer = (container) => {
        $scope.currentContainer = container;
        $location.path("/viewContainer/" + $scope.currentContainer._id);
    };

  



});
