// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var TabletSchema = new mongoose.Schema({
  name: String,
  dose: String,
  amountToTake: Number,
  totalAmount: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Tablet', TabletSchema);
