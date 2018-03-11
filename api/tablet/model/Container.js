
// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ContainerSchema =  new mongoose.Schema({
  name: String,
  tablets: [{
        name: String,
        dose: String,
        amountToTake: String,
        totalAmount: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tablet'
        }
    }],
    required: false
});

// Export the Mongoose model
module.exports = mongoose.model('Container', ContainerSchema);
