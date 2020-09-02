const Tasks = require('../../models/Task');

module.exports = async (request, response) => {
  const queryParams = request.query;
  let query = Tasks.find().sort({ _id: -1 });
  if (queryParams.includePriority) {
    query = query.populate('priority')
  };
  if(queryParams.fromDate && queryParams.toDate){
    //query = query.filt
  }
  if(queryParams.filterByStatus){
    //query.find({ status: queryParams.filterByStatus})
  }
  if(queryParams.filterByDeleted){

  }
  const result = await query;
  response.json(result);
}