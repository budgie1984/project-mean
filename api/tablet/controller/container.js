
var Container = require('../model/Container');

// Create endpoint /api/containers for POSTS
exports.createContainer = function (req, res) {
    // Create a new instance of the container model
    var container = new Container();
    // Set the tablet properties that came from the POST data
    container.name = req.body.name;

    console.log("**** Container to save: ", container);
    // Save the tablet and check for errors
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
    console.log("container update backend controller called", req.params);
    Container.findById(req.params.id, function (err, container) {
        console.log(container);
        console.log(req.body.tablet);
        container.tablets = container.tablets.concat(req.body.tablet);
        container.save(function (err) {
            if (err) {
                return res.json(err);
            }

            return res.json(container);

        });
    });
};