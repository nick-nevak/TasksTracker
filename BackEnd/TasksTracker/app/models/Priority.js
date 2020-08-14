const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrioritySchema = new Schema({
  description: String
});

const Priority = mongoose.model('Priority', PrioritySchema);
module.exports = Priority;