const Tasks = require('../../models/Task');

module.exports = async (request, response) => {
  const { includePriority, fromDate, toDate, filterByStatus, filterByDeleted } = request.query;
  let query = Tasks.find().sort({ _id: -1 });
  if (includePriority == 'true') {
    query = query.populate('priority')
  };
  if (fromDate && toDate) {
    query = query.find({ dueDate: { $lte: toDate } });
  }
  if (filterByStatus == 'true') {
    query = query.find({ status: true });
  }
  if (filterByDeleted == 'true') {
    query = query.find({ isDeleted: true });
  }
  const result = await query;
  response.json(result);
}