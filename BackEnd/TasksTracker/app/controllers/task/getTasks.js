const Tasks = require('../../models/Task');

module.exports = getTasks = async (request, response) =>{
  const result = await Tasks.find();
  response.json(result);
}