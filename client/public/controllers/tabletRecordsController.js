
var tabletApp = angular.module('tabletApp');

tabletApp.controller('tabletRecordsController',
    function($scope, $rootScope, $location, $routeParams, tabletService) {


    $scope.getTablets = function(){
        tabletService.getTablets()
        .success(function(data) {
            console.log("called controller");
            console.log(data);
            let tablets = data;
            $scope.tablets = tablets;
            console.log($scope.tablets);
        })
        .error(function(err) {
            $location.path("./home");
        });
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



        ////////// index.html file sample

        // var pubnubDemo = new PubNub({
        //     publishKey: 'pub-c-d26f60c6-77de-4e45-99da-4b6199539435',
        //     subscribeKey: 'sub-c-cc316182-136c-11e8-acae-aa071d12b3f5'
        // });
    

        // // Subscribe to the tabletbox channel
        // pubnubDemo.addListener({
        //        message: function(message){
        //       console.log(message)
        //       document.write();
        //   }
        // })

        // pubnubDemo.subscribe({
        //     channels: ['tabletbox']
        // });
        
        // pubnubDemo.publish({
        //      message: {
        //       "color" : "blue"
        //       },
        //     channel: 'tabletbox'
        // });
    

});