const Imagen = require('../models/imagenes').Imagen;

module.exports = async (req, res, next) => {
  try {
    const {id} = req.params;

    if (id !== 'new') {
      const imagen = await Imagen.findById(id).populate('creator').exec();
      res.locals = { imagen };

      // Imagen.findById(id).populate('creator').exec(( err, imagen ) => {
      //   if (imagen != !null) {
      //     res.locals = { imagen };
      //     console.log('imagen creator: ', imagen);
      //     next();
      //   } else {
      //     res.redirect('/app')
      //   }
      // });


      console.log('imagen creator: ', imagen);
    }
    next();
  } catch (err) {
    console.log('error en el middleware de buscar imagen: ', err)
    res.redirect('/app/imagenes')
  }
}