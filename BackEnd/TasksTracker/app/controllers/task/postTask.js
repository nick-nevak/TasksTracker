const Tasks = require('../../models/Task');

module.exports = getTasks = async (request, response) => {
  const result = await Tasks.create({
    ...request.body
  });
  response.json(result);
}