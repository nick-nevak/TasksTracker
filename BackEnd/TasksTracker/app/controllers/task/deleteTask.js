const Tasks = require('../../models/Task');

module.exports = async (request, response) => {
  const taskId = request.params.id;
  const result = await Tasks.findByIdAndDelete(taskId);
  response.json(result);
}