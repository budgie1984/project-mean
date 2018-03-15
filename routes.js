var express = require('express');
var TabletApi = require('./api/tablet/controller/tablet');
var ContainerApi = require('./api/tablet/controller/container');


module.exports = (function() {
    var api = express.Router();

    api.post('/createTablet', TabletApi.createTablet);
    api.get('/getTablets', TabletApi.getTablets);
    api.get('/getTablet/:id', TabletApi.getTablet);
    api.delete('/deleteTablet/:id', TabletApi.deleteTablet);
    api.put('/updateTablet/:id', TabletApi.updateTablet);

    api.get('/getContainers', ContainerApi.getContainers);
    api.get('/getContainer/:id', ContainerApi.getContainer);
   // api.delete('/deleteContainer/:id', ContainerApi.deleteContainer);

    api.post('/createContainer', ContainerApi.createContainer);

    return api;
})();