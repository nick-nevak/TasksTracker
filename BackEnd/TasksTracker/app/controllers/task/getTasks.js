const Tasks = require('../../models/Task');

module.exports = async (request, response) => {
  const shouldIncludePriority = request.query.includePriority
  let query = Tasks.find().sort({ _id: -1 });
  if (shouldIncludePriority) {
    query = query.populate('priority')
  };
  const result = await query;
  response.json(result);
}