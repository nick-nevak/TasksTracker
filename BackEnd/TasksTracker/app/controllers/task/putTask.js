const Tasks = require('../../models/Task');

module.exports = getTasks = async (request, response) => {
  const taskId = request.params.id;
  const task = request.body;
  const result = await Tasks.findByIdAndUpdate(taskId, { ...task }, { new: true });
  response.json(result);
}