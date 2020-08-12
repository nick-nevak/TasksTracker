module.exports = (req, res) => {
  let username = '', password = '';
  const formData = req.flash('formData')[0];
  const errors = req.flash('validationErrors');
  if (formData) {
    username = formData.username
    password = formData.password
  }
  res.render('login', {
    errors,
    username,
    password
  });
};
