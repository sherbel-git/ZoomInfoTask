const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  idNumber: {type: String, require: true},
  firstName: {type: String, require: true},
  phone1: {type: String, require: true},
  balance: {type: String, require: true},
  obligo: {type: String, require: true},
});

module.exports =  mongoose.model('Customer', customerSchema);
