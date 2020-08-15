const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrioritySchema = new Schema({
  value: Number,
  description: String
});

const Priority = mongoose.model('Priority', PrioritySchema);
module.exports = Priority;