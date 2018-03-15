var tabletApp = angular.module('tabletApp');

tabletApp.controller('viewContainersController',
    function($scope, $rootScope, $location, containerService) {
      
 
       
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

  
    // $scope.currentContainer = containerService.getContainer($routeParams.containerId)
    //         .success(function(data) {
    //             $scope.currentContainer = data;
    //         })
    //         .error(function(err) {
    //             $location.path("./home");
    //         });

    //     $scope.deleteContainer = function(container) {
    //         console.log('tablet to delete, Tablet: ', container);
    //         containerService.deleteContainer(container._id)
    //             .then(function(res) {
    //                 console.log('response to front', res);
    //                  $location.path("/viewContainers");
    //             });
    //     };



});
