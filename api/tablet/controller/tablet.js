
var Tablet = require('../model/Tablet');

// Create endpoint /api/tablets for POSTS
exports.createTablet = function (req, res) {
    // Create a new instance of the tablet model
    var tablet = new Tablet();
    // Set the tablet properties that came from the POST data
    tablet.name = req.body.name;
    tablet.dose = req.body.dose;
    tablet.amountToTake = req.body.amountToTake;
    tablet.totalAmount = req.body.totalAmount;
    console.log("**** Tablet to save: ", tablet);
    // Save the tablet and check for errors
    tablet.save(function (err) {
      if (err)
        res.send(err);
      res.json({"data" : tablet });
    });
  };


exports.getTablets = function (req, res) {
    Tablet.find({}).exec()
        .then( function (tablets){
            console.log(tablets);
            return res.json(tablets);
        })
};


exports.getTablet = function (req, res) {
    Tablet.findOne({ _id: req.params.id })
        .then(function(tablet) {
            if (tablet != null) {
                return res.json(tablet)
            }
        })
        .catch(function(err) {
            return res.json(err);
        })
};

exports.deleteTablet = function (req, res) {
    console.log(req);
    Tablet.remove({ _id: req.params.id })
        .then(function(tablet) {
            return res.json(tablet);
        })
      .catch(function(err) {
            return res.json(err);
        })
};


exports.updateTablet = function(req, res) {
  console.log("ID FROM THE URL IS IN THE PARAMS OBJECT & THE BODY HAS THE NEW TABLET INFO -  params **** : ", req.params);
    Tablet.findById(req.params.id, function (err, tablet) {
         tablet.name = req.body.name;
         tablet.dose = req.body.dose;
         tablet.amountToTake = req.body.amountToTake;
         tablet.totalAmount = req.body.totalAmount;
         tablet.save(function (err) {
             if(err) { 
                return res.json(err);
               }
             return res.send(200, 'Tablet update successful');
         });
     });
  };