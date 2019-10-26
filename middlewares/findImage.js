const Imagen = require('../models/imagenes').Imagen;
const ownerCheck = require('./imagePermission');

module.exports = async (req, res, next) => {
  try {
    const {id} = req.params;

    if (id !== 'new') {
      const imagen = await Imagen.findById(id).populate('creator').exec();
      console.log('comparando data imagen: ', imagen);
      console.log('comparando imagen: ', imagen != null);


      console.log('ckeck user : ', ownerCheck(imagen, req, res));

      if (imagen != null && ownerCheck(imagen, req, res) ) {
        res.locals = { imagen };    
        // res.redirect('http://google.com/')
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


      console.log('imagen creator: ', imagen);
    }

    next();
  } catch (err) {
    console.log('error en el middleware de buscar imagen: ', err)
    res.redirect('/app/imagenes')
  }
}