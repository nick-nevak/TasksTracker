const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudyItemSchema = new Schema({
  title: String,
  description: String,
  source: String
});

const StudyItem = mongoose.model('StudyItem', StudyItemSchema);
module.exports = StudyItem;