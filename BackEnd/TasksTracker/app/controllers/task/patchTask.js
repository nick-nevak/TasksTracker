const Tasks = require('../../models/Task');

module.exports = async (request, response) => {
  const taskId = request.params.id;
  const patchDocument = request.body;
  // TODO: return only modified fields
  const result = await Tasks.findByIdAndUpdate(taskId, { $set: { ...patchDocument } }, { new: true });
  response.json(result);
}