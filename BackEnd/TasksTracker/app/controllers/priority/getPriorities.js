const Priority = require('../../models/Priority');

module.exports = getTasks = async (request, response) =>{
  const result = await Priority.find();
  response.json(result);
}