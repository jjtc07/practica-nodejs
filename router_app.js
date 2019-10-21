const express = require('express');
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

});

router.route('/imagenes/:id')
      .get((req, res) => { // show

      })
      .put((req, res) => { // update

      })
      .delete((req, res) => { // delete

      })

router.route('/imagenes')
      .get((req, res) => { // index

      })
      .post((req, res) => { // store

      })


module.exports = router;
