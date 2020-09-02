const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: String,
  status: Boolean,
  dueDate: Date,
  description: String,
  priority: {
    type: Schema.Types.ObjectId,
    ref: 'Priority'
  },
  isDeleted: Boolean
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;