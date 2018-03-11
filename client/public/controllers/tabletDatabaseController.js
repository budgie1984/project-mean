var tabletApp = angular.module('tabletApp');

tabletApp.controller('tabletDatabaseController',
    function($scope, $rootScope, $location, $routeParams, tabletService) {

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

        $scope.viewTablet = (tablet) => {
            $scope.currentTablet = tablet;
            $location.path("/viewTablet/" + $scope.currentTablet._id);
        };

        $scope.currentTablet = tabletService.getTablet($routeParams.tabletId)
            .success(function(data) {
                $scope.currentTablet = data;
            })
            .error(function(err) {
                $location.path("./home");
            });

        $scope.deleteTablet = function(tablet) {
            console.log('tablet to delete, Tablet: ', tablet);
            tabletService.deleteTablet(tablet._id)
                .then(function(res) {
                    console.log('response to front', res);
                });
        };

        $scope.updateTablet = function(tablet) {
            console.log('tablet to update, Tablet: ', tablet);
            $scope.currentTablet = tabletService.getTablet($routeParams.tabletId);

            tabletService.updateTablet(tablet._id)
                .then(function(res) {
                    console.log('response to front', res);
                });
        };


    });