const User = require('../models/user').User;
module.exports = async (req, res, next) => {
  const {user_id} = req.session;
  if ( !user_id )
    res.redirect('/login');

  try {
    const user = await User.findById(user_id);
    res.locals = { user };
    next();
  } catch (err) {
    console.error(err);
    res.redirect('/login');    
  }
}