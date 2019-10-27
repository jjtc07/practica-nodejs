const Imagen = require('../models/imagenes').Imagen;
const ownerCheck = require('./imagePermission');

module.exports = async (req, res, next) => {
  try {
    const {id} = req.params;

    if (id !== 'new') {
      const imagen = await Imagen.findById(id).populate('creator').exec();

      if (imagen != null && ownerCheck(imagen, req, res) ) {
        res.locals = { imagen };    
      } else {
        res.redirect('/app')
      }

      // Imagen.findById(id).populate('creator').exec(( err, imagen ) => {
      //   if (imagen != !null) {
      //     res.locals = { imagen };
      //     console.log('imagen creator: ', imagen);
      //     next();
      //   } else {
      //     res.redirect('/app')
      //   }
      // });
    }

    next();
  } catch (err) {
    console.log('error en el middleware de buscar imagen: ', err)
    res.redirect('/app/imagenes')
  }
}