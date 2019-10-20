const mongoose = require('../config/mongoose').mongoose;
const Schema = mongoose.Schema;

// tipos de datos para guardar en mongodb
/*
  String
  Number
  Date
  Buffer
  Boolean
  Mixed
  Objectid
  Array
*/

const user_schema = Schema({
  name: String,
  username: String,
  password: String,
  age: Number,
  email: String,
  date_of_birth: Date,
});

module.exports.User = mongoose.model('User', user_schema);

