const StudyItems = require('../../models/StudyItem');

module.exports = getStudyItems = async (request, response) =>{
  const result = await StudyItems.find();
  response.json(result);
}