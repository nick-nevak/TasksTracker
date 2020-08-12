const BlogPost = require('../models/BlogPost.js');
const path = require('path');

module.exports = async (req, res) => {
  const validationErrors = [];
  if (!req.body.title) {
    validationErrors.push('Title is required');
  }
  if (!req.body.body) {
    validationErrors.push('Body is required');
  }
  if (!req.files || !req.files.image) {
    validationErrors.push('Image is required');
  }
  if (validationErrors.length > 0) {
    req.flash('validationErrors', validationErrors);
    req.flash('formData', req.body);
    res.redirect('/posts/new');
  } else {
    const image = req.files.image;
    await image.mv(path.resolve(__dirname, '../public/img', image.name));
    await BlogPost.create({
      ...req.body,
      userid: req.session.userId,
      image: `/img/${image.name}`
    });
    res.redirect('/');
  }
}
