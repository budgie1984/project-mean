var  tabletApp = angular.module('tabletApp', ['ngRoute']);

    tabletApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
        .when('/tablets', {
          templateUrl: 'partials/tablet-list.html',
          controller: 'TabletListCtrl'
        })
        .when('/viewTablet/:tabletId', {
          templateUrl: 'partials/tablet-detail.html',
          controller: 'tabletDatabaseController'
        })
        .when('/tabletdatabase', {
          templateUrl: 'partials/tabletdatabase.html',
          controller: 'tabletDatabaseController'
        })
         .when('/register', {
          templateUrl: 'partials/register.html',
          controller: 'RegisterCtrl'
        })
         .when('/login', {
          templateUrl: 'partials/login.html',
          controller: 'LoginCtrl'
        })
         .when('/home', {
          templateUrl: 'partials/home.html',
          controller: 'homeController'
        })
         .when('/createContainer', {
          templateUrl: 'partials/createContainer.html',
          controller: 'createContainerController'
        })
        .when('/viewContainers', {
          templateUrl: 'partials/viewContainers.html',
          controller: 'viewContainersController'
        })
        .when('/viewContainer/:containerId', {
          templateUrl: 'partials/viewContainer-details.html',
          controller: 'viewContainersController'
        })
        .when('/tabletrecords', {
          templateUrl: 'partials/tabletrecords.html',
          controller: 'tabletRecordsController'
        })
        .when('/landing', {
          templateUrl: 'partials/landingpage.html',
          controller: ''
        })
         .otherwise({
          redirectTo: '/landing'
        });
 }]);






