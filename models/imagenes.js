const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagenSchema = Schema({
  title: {
    type: String,
    required: 'El título es obligatorío',
  },
})

module.exports.Imagen = mongoose.model('Imagen', imagenSchema);

