var tabletApp = angular.module('tabletApp');

tabletApp.controller('viewContainersController',
    function ($scope, $rootScope, $location,$routeParams, containerService, tabletService) {



        containerService.getContainers()
            .success(function (data) {
                console.log("called controller");
                console.log(data);
                let containers = data;
                $scope.containers = containers;
                console.log($scope.containers);

            })
            .error(function (err) {
                $location.path("./home");
            });

        $scope.viewContainer = (container) => {
            $scope.currentContainer = container;
            $location.path("/viewContainer/" + $scope.currentContainer._id);
        };


        $scope.currentContainer = containerService.getContainer($routeParams.containerId)
                .success(function(data) {
                    $scope.currentContainer = data;
                })
                .error(function(err) {
                    $location.path("./home");
                });

        $scope.deleteContainer = function (container) {
            console.log('tablet to delete, Tablet: ', container);
            containerService.deleteContainer(container._id)
                .then(function (res) {
                    console.log('response to front', res);
                    alert("Container Deleted");
                    $location.path("/viewContainers");
                });
        };




        tabletService.getTablets()
            .success(function(data) {
                console.log("called controller");
                console.log(data);
                var tablets = data;
                $scope.tablets = tablets;
                console.log($scope.tablets);
                $scope.orderProp = 'name';

            })
            .error(function(err) {
                $location.path("./home");
            });






            $scope.addTabletToContainer = function(tablet) {
                
                $scope.currentContainer = containerService.getContainer($routeParams.containerId)
                .success(function(data) {
                    $scope.currentContainer = data;
                });
                var container = [];
                
                

                console.log('tablet added to container: ');
              
            };

            $scope.removeTabletFromContainer = function(){

            };

            


            var tablet = function(tabletData){
                this.name = tabletData.name;
                this.dose = tabletData.dose;
                this.amountToTake = tabletData.amountToTake;
                this.totalAmount = tabletData.totalAmount;
            };
            
    });