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






            $scope.addTabletToContainer = function(tablet) {
                var container = $scope.currentContainer;
                
                console.log("****  container,", container);
                console.log("**** tablet to add", tablet);
                    
                container.tablets.push(tablet);
                console.log("new tablets", container.tablets);
                console.log("container after adding in angular front end: ", container);
                
                containerService.updateContainer(container) 
                .success(function(data) {
                   console.log("data, ",  data);

                })
                .error(function (err) {
                    $location.path("./landingpage");
                });
            };


       

            $scope.removeTabletFromContainer = function(tablet){
                var index = tablets.indexOf(tablet);
                $scope.currentContainer.splice(index,1);
                
                containerService.updateContainer(container) 
                .success(function(data) {
                   console.log("data, ",  data);

                })
                .error(function (err) {
                    $location.path("./landingpage");
                });
            };

            


            var tablet = function(tabletData){
                this.name = tabletData.name;
                this.dose = tabletData.dose;
                this.amountToTake = tabletData.amountToTake;
                this.totalAmount = tabletData.totalAmount;
            };
            


    //////// Timmys sample from his project, altered medsChannel variable he had to tabletChannel
    /////// and changed pub/sub keys
        // var pubnubDemo = new PubNub({
        //     publishKey: 'pub-c-d26f60c6-77de-4e45-99da-4b6199539435',
        //     subscribeKey: 'sub-c-cc316182-136c-11e8-acae-aa071d12b3f5'
        // });
        // $scope.tabletChannel = 'tabletbox';

    
        //     // Subscribing to the ‘meds’ channel and trigering the message callback
        //     Pubnub.subscribe({
        //         channel: $scope.tabletChannel,
        //         triggerEvents: ['callback']
        //     });
    
        //     // Listening to the callbacks
        //     $scope.$on(Pubnub.getMessageEventNameFor($scope.tabletChannel), function (ngEvent, m) {
        //         $scope.$apply(function () {
        //             $scope.tabletMessage = m;
        //         });
        //     });



    });