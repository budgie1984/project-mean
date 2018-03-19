
var Container = require('../model/Container');

// Create endpoint /api/containers for POSTS
exports.createContainer = function (req, res) {
    // Create a new instance of the container model
    var container = new Container();
    // Set the container properties that came from the POST data
    container.name = req.body.name;

    console.log("**** Container to save: ", container);
    // Save the container and check for errors
    container.save(function (err) {
        if (err)
            res.send(err);
        res.json({ "data": container });
    });
};


exports.getContainers = function (req, res) {
    Container.find({}).exec()
        .then(function (containers) {
            console.log(containers);
            return res.json(containers);
        });
};

exports.getContainer = function (req, res) {
    Container.findOne({ _id: req.params.id })
        .then(function (container) {
            if (container != null) {
                return res.json(container);
            }
        })
        .catch(function (err) {
            return res.json(err);
        });
};


exports.deleteContainer = function (req, res) {
    console.log(req);
    Container.remove({ _id: req.params.id })
        .then(function (container) {
            return res.json(container);
        })
        .catch(function (err) {
            return res.json(err);
        });
};

exports.updateContainer = function (req, res) {
     console.log("container update backend controller called", req.body);
    Container.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { 'new': true })
        .then( function (container) {
            console.log("container",container);
            if (container != null) {
                return res.json(container);
            }
        })
        .catch( function (err) {
            return res.json(err);
        });
};

