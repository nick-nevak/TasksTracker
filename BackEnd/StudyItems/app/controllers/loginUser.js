const bcrypt = require('bcrypt')
const User = require('../models/User')

const redirectBackWithErrors = (req, res) =>{
  req.flash('validationErrors', ['Invalid username or password']);
  req.flash('formData',req.body);
  res.redirect('/auth/login');
}

module.exports = async (req, res) => {
  const { username, password } = req.body;
  user = await User.findOne({ username: username });

  if (user) {
    same = await bcrypt.compare(password, user.password);
    if (same) {
      req.session.userId = user._id;
      res.redirect('/')
    }
    else {
      redirectBackWithErrors(req, res);
    }
  }
  else {
    redirectBackWithErrors(req, res);
  }
}

