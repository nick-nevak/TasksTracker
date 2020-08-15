const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: String,
  description: String,
  source: String,
  priority: {
    type: new Schema({
      value: Number,
      description: String
    })
  }
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;