// Load required packages
var mongoose = require('mongoose');

// Define schema
var UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  containers: [{
    name: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'container'
    }
  }],

  required: false

});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);