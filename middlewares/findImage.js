const Imagen = require('../models/imagenes').Imagen;

module.exports = async (req, res, next) => {
  try {
    const {id} = req.params;

    if (id !== 'new') {
      const imagen = await Imagen.findById(id);
      res.locals = { imagen };
    }
    next();
  } catch (err) {
    console.log('error en el middleware de buscar imagen: ', err)
    res.redirect('/app/imagenes')
  }
}