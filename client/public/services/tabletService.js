angular.module('tabletApp')
    .service('tabletService', function($http) {
        var api = {
            addTablet: function(tablet) {
                return $http.post('api/createTablet', tablet);
            },

            getTablets: function() {
                console.log("called service");
                return $http.get('api/getTablets');
            },
            getTablet: function(id) {
                return $http.get('/api/getTablet/' + id);
            },

            deleteTablet: function(id) {
              console.log('in service', id);
                return $http.delete('/api/deleteTablet/' + id);
            },
            updateTablet: function(tablet){
                console.log('updated service called - NEEDED TO SEND THE TABLET ID IN THE URL AND THE NEW TABLET BODY TO USE FOR UPDATE')
                return $http.put('/api/updateTablet/' + tablet.id, tablet)
            }
        };
        return api;
    });