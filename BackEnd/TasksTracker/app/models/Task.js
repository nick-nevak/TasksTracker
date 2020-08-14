const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: String,
  description: String,
  source: String,
  priority: {
    type: Schema.Types.ObjectId,
    ref: 'Priority'
  }
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;