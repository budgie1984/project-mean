// Load required packages
var mongoose = require('mongoose');

// Define tablet schema
var TabletSchema = new mongoose.Schema({
  name: String,
  dose: String,
  amountToTake: Number,
  totalAmount: Number,
  description: String
});

// Export the Mongoose model
module.exports = mongoose.model('Tablet', TabletSchema);
