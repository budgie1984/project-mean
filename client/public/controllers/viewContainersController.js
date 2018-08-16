var tabletApp = angular.module('tabletApp');

tabletApp.controller('viewContainersController',
    function ($scope, $rootScope, $location,$routeParams,
             $route,containerService, tabletService , Pubnub, $pubnubChannel, $pubnubChannelGroup,$timeout ){


        // gets all containers in db
        containerService.getContainers()
            .success(function (data) {
                var containers = data;
                $scope.containers = containers;
            })
            .error(function (err) {
                $location.path("./home");
            });

        $scope.viewContainer = function(container)  {
            $scope.currentContainer = container;
            $location.path("/viewContainer/" + $scope.currentContainer._id);
        };

        // function to get the current container by it id
        $scope.currentContainer = containerService.getContainer($routeParams.containerId)
                .success(function(data) {
                    $scope.currentContainer = data;
                })
                .error(function (err) {
                    $location.path("./landingpage");
                });

        // function to delete a container
        $scope.deleteContainer = function(container) {
            console.log('tablet to delete, Tablet: ', container);
            containerService.deleteContainer(container._id)
                .then(function (res) {
                    alert("Container Deleted");
                    $location.path("/viewContainers");
                });
        };

        // get tablets via tablet service
        tabletService.getTablets()
            .success(function(data) {
                var tablets = data;
                $scope.tablets = tablets;
                $scope.orderProp = 'name';


            })
            .error(function(err) {
                $location.path("./home");
            });


            // add tablets to selected container
            $scope.addTabletToContainer = function(tablet) {
                var container = $scope.currentContainer; // get the container
                container.tablets.push(tablet); // push a tablet to it
          
                containerService.updateContainer(container) // update the container
                .success(function(data) {
                   console.log("data, ",  data);
                   
                })
                .error(function (err) {
                    $location.path("./landingpage");
                });

                location.reload();
            };
            // remove a tablet from the container
            $scope.removeTabletFromContainer = function(tablet){
                var container = $scope.currentContainer; // get the current container
                var index = container.tablets.indexOf(tablet); 
              
                container.tablets.splice(index,1); // remove the index of the selected tablet
                
                containerService.updateContainer(container) // update the container afterwrads 
                .success(function(data) {
                   console.log("data, ",  data);

                })
                .error(function (err) {
                    $location.path("./landingpage");
                });
            };

            // Model for Tablets
            var tablet = function(tabletData){
                this.name = tabletData.name;
                this.dose = tabletData.dose;
                this.amountToTake = tabletData.amountToTake;
                this.totalAmount = tabletData.totalAmount;
            };
            

            // Subscribing to PubNub
            $scope.tabletChannel = 'tabletbox';

            (function subTablets() {
                Pubnub.init({
                    publish_key: 'publish key here',
                    subscribe_key: 'subscribe key here',
                    uuid: $scope.uuid
                });
                Pubnub.subscribe({
                    channel  : $scope.tabletChannel,
                    triggerEvents: ['callback']
                });
                $rootScope.$on(Pubnub.getMessageEventNameFor($scope.tabletChannel), function (ngEvent, message) {
                    $scope.$apply(function () {

                        $scope.tabletBoxMessage = message; // get the  PubNub Message
                        var expectedMessage = 'Tablets Taken';
                        var container = $scope.currentContainer; // get the current container
                        
                        if ($scope.tabletBoxMessage === expectedMessage) { // if message is Tablets Taken
                        
                            container.tablets.forEach(function (tablet) {
                                tablet.totalAmount -= tablet.amountToTake; // subtract amount to take from total amount for all tablets
                              
                                console.log(tablet);
                                
                                containerService.updateContainer(container) // update the container db afterwards 
                                .success(function(data) {
                                   return data;
                
                                })
                                .error(function (err) {
                                    $location.path("./landingpage");
                                });
                            });
                        } else{
                            $scope.tabletBoxMessage = "Not Taken";
                        }

                    });
                });

                })();
       
                  
                // get todays date
                $scope.date = new Date(Date.now()).toDateString();
            

 });
