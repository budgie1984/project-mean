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
                .error(function (err) {
                    $location.path("./landingpage");
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






            $scope.addTabletToContainer = function(container,tablet) {
                
                $scope.currentContainer = containerService.getContainer($routeParams.containerId)
                .success(function(container) {
                    $scope.currentContainer = container;
                });
                $scope.currentTablet = tabletService.getTablet($routeParams.tabletId)
                .success(function(tablet){
                    $scope.currentTablet = tablet;
                });

                $scope.currentContainer.tablets = [];

                var tabletToAdd = $scope.currentTablet;
                var containerAddingTo = $scope.currentContainer.tablets;

                containerAddingTo.push(tabletToAdd);
                console.log(containerAddingTo);



                // container.forEach(function(data) {
                //     $scope.currentContainer.push($scope.currentTablet);
                //     console.log($scope.currentContainer);
                // });
                // var container = ["tab1","tab2","tab3"];
                
                // for(var i = 0; i , container.length; i++){
                //     console.log(container[i]);
                // }
                

              
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