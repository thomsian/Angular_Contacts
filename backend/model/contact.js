const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    firstName:{type: String, required:true},
    secondName:{type: String, required: true},
    contactNo:{type: String, required: true}
});

module.exports = mongoose.model('Contact',contactSchema);