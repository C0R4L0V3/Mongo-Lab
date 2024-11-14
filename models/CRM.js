const mongoose = require('mongoose');

const crmSchema = new mongoose.Schema({
    text: String,
    age: Number
});

const CRM = mongoose.model('CRM', crmSchema)

module.exports = CRM