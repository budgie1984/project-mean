angular.module('tabletApp')
    .service('containerService', function($http) {
        var api = {
            createContainer: function (container) {
                return $http.post('api/createContainer', container);
            },
            getContainers: function () {
                return $http.get('api/getContainers');
            },
            getContainer: function (id) {
                return $http.get('api/getContainer/' + id);
            },
            deleteContainer: function (id) {
                console.log('delete service called', id);
                return $http.delete('api/deleteContainer/' + id);
            },
            updateContainer: function (container) {
                console.log('updated service called ');
                return $http.put('api/updateContainer/' + container.id, container);
            }
        
        };
        return api;
    });

