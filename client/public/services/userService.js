angular.module('tabletApp')
    .service('userService', function($http) {
        var api = {
            createUser: function(user) {
                return $http.post('api/createUser', user);
            },

            getUsers: function() {
                console.log("called service");
                return $http.get('api/getUsers');
            },
            getUser: function(id) {
                return $http.get('/api/getUser/' + id);
            },

            deleteUser: function(id) {
              console.log('delete service called', id);
                return $http.delete('/api/deleteUser/' + id);
            },
            updateUser: function(user){
                console.log('updated service called');
                return $http.put('/api/updateUser/' + user.id, user);
            }
        };
        return api;
    });