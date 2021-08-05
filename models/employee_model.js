// referencing the mongoose
const mongoose = require('mongoose');

//defining the scheme for the project
var projectSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }
});


module.exports = mongoose.model('Employee', projectSchema); // Project



