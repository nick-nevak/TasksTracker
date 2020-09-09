const Tasks = require('../../models/Task');

module.exports = async (request, response) => {
  const queryParams = request.query;
  let query = Tasks.find().sort({ _id: -1 });
  if (queryParams.includePriority) {
    query = query.populate('priority')
  };
  // if(queryParams.fromDate && queryParams.toDate){
  //   //query = query.filt
  // }
  if(queryParams.filterByStatus == 'true'){
    query = query.find({ status: true});
  }
  if(queryParams.filterByDeleted == 'true'){
    query = query.find({ isDeleted: true});
  }
  const result = await query;
  response.json(result);
}