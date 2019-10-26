const Imagen = require('../models/imagenes').Imagen;

module.exports = (image, req, res) => {
  try {
    // true = si tienes permisos
    // false = no tienes permisos


    if (req.method === 'GET' && req.path.indexOf('edit') < 0 ) {
      return true;
    }

    if (typeof image.creator == 'undefined') return false;

    if ( image.creator._id.toString() == res.locals.user._id ) {
      // esta imagen la subío el usuario logueado
      return true;
    }

    return false;
    
  } catch (err) {
    console.log('error en el middleware de permisos imagen: ', err)
    res.redirect('/app/imagenes')
  }
}