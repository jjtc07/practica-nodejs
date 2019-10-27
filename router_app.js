const express = require('express');
const Imagen = require('./models/imagenes').Imagen;
const findImagenMiddleware = require('./middlewares/findImage');

const router = express.Router();

router.get('/', async (req, res) => {
  // buscar el usuario logueado
  // res.render('app/home');
  // res.render('login');
  const imagenes = await Imagen.find();
  res.render('app/imagenes', {imagenes});
})

router.all('/imagenes/:id*', findImagenMiddleware );

router.get('/imagenes/new', (req, res) => { // create
  res.render('app/imagenes/new');
});

router.get('/imagenes/:id/edit', async (req, res) => { // edit
  // const {id} = req.params;
  // const imagen = await Imagen.findById(id);

  // res.render('app/imagenes/edit', {imagen});
  res.render('app/imagenes/edit');
});

router.route('/imagenes/:id')
      .get( (req, res) => { // show
        try {
          // const {id} = req.params;
          // const imagen = await Imagen.findById(id);
          // res.send('orueba');

          // se puede obtener la imagen de la siguiente manera luego de refactorizar 
          // const imagen = res.locals.imagen;


          res.render('app/imagenes/show');
        } catch (err) {
          console.log('error al mostrar imagen: ', err)
          res.send('error al mostrar imagen');
        }
      })
      .put( async (req, res) => { // update
        // const {id} = req.params;
        // const imagen = await Imagen.findById(id);
        const { title } = req.body;
        const imagen = res.locals.imagen;
        imagen.title = title;
        await imagen.save();
        res.redirect('/app/imagenes');
      })
      .delete( async (req, res) => { // delete
        try {
          const {id} = req.params;
          // const imagen = await Imagen.findById(id);
          // await imagen.remove();
          await Imagen.findOneAndRemove({_id: id});
          res.redirect('/app/imagenes');
        } catch (err) {
          res.send('error al eliminar imagen');
        }
      })

router.route('/imagenes')
      .get( async (req, res) => { // index
        const imagenes = await Imagen.find();
        res.render('app/imagenes', {imagenes});
      })
      .post( async (req, res) => { // store
        try {
          const {title} = req.body;
          const { user } = res.locals;
          await Imagen.create({
            title, 
            creator: user._id
          });
          res.redirect(`imagenes`)
        } catch (err) {
          console.log('error al guardar imagen: ', err);
          // res.send('error al guardar imagen');
          res.redirect(`/app/imagenes/new`)
        }
      })


module.exports = router;
