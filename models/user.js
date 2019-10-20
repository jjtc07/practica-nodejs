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

const emailMatch = [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Coloca un email valido' ]

const userSchema = Schema({
  name: String,
  username: {type: String, required: true, maxlength: [50, 'Username muy grandre, máximo 50 caracteres.']},
  password: {
    type: String,
    minlength: [8, 'El password es muy corto'],
    // validate: {
    //   validator: function(v) {
    //     return /\d{3}-\d{3}-\d{4}/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid phone number!`
    // },
    validate: {
      validator: (password) => {
        return this.password_confirmation == password;
      },
      message: 'Las contraseñas no coinciden'
    }
  },
  age: {type: Number, min: [5, 'la edad no puede ser menor que 5'], max: 140},
  email: {type: String, required: 'El correo es obligatorio.', match: emailMatch},
  date_of_birth: Date,
  sex: {type: String, enum: {values: ['M', 'F'], message: 'Opción no válida.'}}
});

userSchema.virtual('password_confirmation')
            .get(() => this.password_confirmation)
            .set((password) => {this.password_confirmation = password})

module.exports.User = mongoose.model('User', userSchema);

