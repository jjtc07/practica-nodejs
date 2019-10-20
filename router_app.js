const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // buscar el usuario logueado
  res.render('app/home');
  // res.render('login');
})

module.exports = router;
