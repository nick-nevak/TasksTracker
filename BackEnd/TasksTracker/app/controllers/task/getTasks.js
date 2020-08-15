const Tasks = require('../../models/Task');

module.exports = async (request, response) => {
  const shouldIncludePriority = request.query.includePriority
  const query = shouldIncludePriority === 'true' ? Tasks.find().populate('priority') : Tasks.find();
  const result = await query;
  response.json(result);
}