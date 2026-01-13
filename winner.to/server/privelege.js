const mongoose = require('mongoose');

const PrivilegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    features: [String]
});

module.exports = mongoose.model('Privilege', PrivilegeSchema);