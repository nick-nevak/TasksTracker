const flash = require('connect-flash');

module.exports = (req, res) => {
  let username = '', password = '';
  const data = req.flash('data')[0];
  const errors = req.flash('validationErrors');
  if (data) {
    username = data.username
    password = data.password
  }
  res.render('register', {
    errors,
    username,
    password
  });
}