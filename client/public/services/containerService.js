angular.module('tabletApp')
    .service('containerService', function($http) {
        var api = {
          createContainer : function(container) {
           	return $http.post('api/createContainer', container);         
      	  },

      	  getContainers : function() {
           	return $http.get('api/getContainers');         
      	  }
        };
        return api;
    });