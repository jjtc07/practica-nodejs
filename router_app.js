const express = require('express');
const Imagen = require('./models/imagenes').Imagen;

const router = express.Router();

router.get('/', (req, res) => {
  // buscar el usuario logueado
  res.render('app/home');
  // res.render('login');
})


router.get('/imagenes/new', (req, res) => { // create
  res.render('app/imagenes/new');
});

router.get('/imagenes/:id/edit', (req, res) => { // edit

});``

router.route('/imagenes/:id')
      .get( async (req, res) => { // show
        try {
          const {id} = req.params;
          const imagen = await Imagen.findById(id);
  
          res.render('app/imagenes/show', {imagen});
        } catch (err) {
          console.log('error al mostrar imagen: ', err)
          res.send('error al mostrar imagen');
        }
      })
      .put((req, res) => { // update

      })
      .delete((req, res) => { // delete

      })

router.route('/imagenes')
      .get((req, res) => { // index

      })
      .post( async (req, res) => { // store
        const {title} = req.body;

        try {
          const imagen = await Imagen.create({title,});
          res.redirect(`imagenes/${imagen._id}`)
          res.send('se guardo correctamente')
        } catch (err) {
          console.log('error al guardar imagen: ', err);
          res.send('error al guardar imagen');
        }
      })


module.exports = router;
