var tabletApp = angular.module('tabletApp');

tabletApp.controller('tabletDatabaseController',
    function ($scope, $rootScope, $location, $routeParams, tabletService) {

        // get all tablets in the db
        tabletService.getTablets()
            .success(function (data) {
                console.log("called controller");
                console.log(data);
                var tablets = data;
                $scope.tablets = tablets;
                console.log($scope.tablets);
                $scope.orderProp = 'name';

            })
            .error(function (err) {
                $location.path("./home");
            });


        // view a single tablet by getting it id
        $scope.viewTablet = (tablet) => {
            $scope.currentTablet = tablet;
            $location.path("/viewTablet/" + $scope.currentTablet._id);
        };
        // get the current tablet
        $scope.currentTablet = tabletService.getTablet($routeParams.tabletId)
            .success(function (data) {
                $scope.currentTablet = data;
            })
            .error(function (err) {
                $location.path("./home");
            });

        // delete a tablet by its id
        $scope.deleteTablet = function (tablet) {
            console.log('tablet to delete, Tablet: ', tablet);
            tabletService.deleteTablet(tablet._id)
                .then(function (res) {
                    console.log('response to front', res);
                    $location.path("/tabletdatabase");
                });
        };





        $scope.updateTablet = function (tablet) {
            tablet.id = $routeParams.tabletId;
            console.log('tablet to update SENT FROM THE UI HTML PAGE, Tablet: ', tablet);
            tabletService.updateTablet(tablet)
                .success(function (res) {
                    console.log('response to front', res);
                    $location.path("/tabletdatabase");
                })
                .error(function (err) {
                    $location.path("/home");
                });
        };



 });