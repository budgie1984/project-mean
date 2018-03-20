// Load required packages
var express = require('express');
var routes = express.Router();
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');

var bodyParser = require('body-parser');

// var MongoClient = require('mongodb').MongoClient;
// var MONGO_URL = 'mongodb://boggyb:Williamwallace1314@ds121118.mlab.com:21118/projectdatabase';


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
});

// Use environment defined port or 3000
var port = process.env.PORT || 3000;


var db;

db = 'mongodb://127.0.0.1:27017/tabletApp';


app.listen(port);
console.log('Server started on port ' + port);

mongoose.connect(db, function(err) {
    if (err) {
        console.log("Error ", err);
    } else {
        console.log('Connected to database');
    }
});



// MongoClient.connect(MONGO_URL, function(err) {
//     if (err) {
//         console.log("Error ", err);
//     } else {
//         console.log('Connected to database');
//     }
// });


var api = require('./routes');
app.use('/api', api);


