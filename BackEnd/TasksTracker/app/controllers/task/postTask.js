const Tasks = require('../../models/Task');

module.exports = async (request, response) => {
  const task = request.body;
  if(!task.priority){
    delete task.priority;
  }
  const result = await Tasks.create({
    ...task
  });
  response.json(result);
}