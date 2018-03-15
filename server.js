// Load required packages
var express = require('express');
var routes = express.Router();
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');

var bodyParser = require('body-parser');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));


app.use('/', express.static(path.join(__dirname, './client/public')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './client/public/index.html'));
})

// Use environment defined port or 3000
var port = process.env.PORT || 3000;


var db;

db = 'mongodb://127.0.0.1:27017/tabletApp'

// app.listen(port, () => {
//     console.log(`Server started on ${port}`);
// });

app.listen(port);
console.log('Server started on port ' + port);

mongoose.connect(db, function(err) {
    if (err) {
        console.log("Error ", err);
    } else {
        console.log('Connected to database');
    }
});

var api = require('./routes');
app.use('/api', api);

// -- New Code Below Here -- //

// CREATE A Tablet
// Create a new route with the prefix /tablets
// var tabletsRoute = router.route('/tablets');

// // Create endpoint /api/tablets for POSTS
// tabletsRoute.post(function (req, res) {
//     // Create a new instance of the tablet model
//     var tablet = new Tablet();

//     // Set the tablet properties that came from the POST data
//     tablet.name = req.body.name;
//     tablet.dose = req.body.dose;
//     tablet.amountToTake = req.body.amountToTake;
//     tablet.totalAmount = req.body.totalAmount;

//     // Save the tablet and check for errors
//     tablet.save(function (err) {
//       if (err)
//         res.send(err);

//       res.json({ message: 'Tablet added!', data: tablet });
//     });
//   });

// // GET All Tablets
// // Create endpoint /api/tablets for GET
// tabletsRoute.get(function (req, res) {
//     // Use the tablet model to find all tablet
//     Tablet.find(function (err, tablets) {
//       if (err)
//         res.send(err);

//       res.json(tablets);
//     });
//   });

// // GET Single Tablet
// // Create a new route with the /tablets/:tablet_id prefix
// // var tabletRoute = router.route('/tablets/:tablet_id');

// // Create endpoint /api/tablets/:tablet_id for GET
// tabletRoute.get(function (req, res) {
//     // Use the tablet model to find a specific tablet
//     Tablet.findById(req.params.tablet_id, function (err, tablet) {
//       if (err)
//         res.send(err);

//       res.json(tablet);
//     });
//   });

// // DELETE TABLET
// // Create endpoint /api/tablets/:tablet_id for DELETE
// tabletRoute.delete(function (req, res) {
//     // Use the tablet model to find a specific tablet and remove it
//     Tablet.findByIdAndRemove(req.params.tablet_id, function (err) {
//       if (err)
//         res.send(err);

//       res.json({ message: 'Tablet removed!' });
//     });
//   });

// // UPDATE TABLET
// // Create endpoint /api/tablets/:tablet_id for PUT
// tabletRoute.put(function (req, res) {
//     // Use the tablet model to find a specific tablet
//     Tablet.findById(req.params.tablet_id, function (err, tablet) {
//       if (err)
//         res.send(err);

//       // Update the existing tablet quantity
//       tablet.name = req.body.name;
//       tablet.dose = req.body.dose;
//       tablet.amounToTake = req.body.amounToTake;
//       tablet.totalAmount = req.body.totalAmount;

//       // Save the tablet and check for errors
//       tablet.save(function (err) {
//         if (err)
//           res.send(err);

//         res.json(tablet);
//       });
//     });
//   });

// // Register all our routes with /api
// app.use('/api', router);

// Start the server
console.log('Insert tablet on port ' + port);
