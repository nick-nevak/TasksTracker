const StudyItems = require('../models/StudyItem');

module.exports = getStudyItems = async (request, response) =>{
  const items = await StudyItems.find();
  response.json(items);
}