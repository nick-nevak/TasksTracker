module.exports = (req, res) => {
  let body = '', title = '';
  const formData = req.flash('formData')[0];
  const errors = req.flash('validationErrors');

  if (formData) {
    body = formData.body;
    title = formData.title;
  }
  res.render('create', {
    errors,
    body,
    title,
    createPost: true
  });
};