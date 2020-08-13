const Tasks = require('../../models/Task');

module.exports = getTasks = async (request, response) => {
  const taskId = request.params.id;
  const result = await Tasks.findById(taskId);
  response.json(result);
}