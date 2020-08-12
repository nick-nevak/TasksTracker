const User = require('../models/User.js');

module.exports = async (req, res) => {
  try {
    await User.create(req.body);
  }
  catch (error) {
    const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
    req.flash('validationErrors', validationErrors);
    req.flash('data',req.body);
    return res.redirect('/auth/register')
  }
  res.redirect('/');
};