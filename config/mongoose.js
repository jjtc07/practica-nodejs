const mongoose = require('mongoose');

const urlConnect = 'mongodb://localhost/fotos'

mongoose.connect(urlConnect, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports.mongoose = mongoose;

