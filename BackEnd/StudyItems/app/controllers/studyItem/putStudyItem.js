const StudyItems = require('../../models/StudyItem');

module.exports = getStudyItems = async (request, response) => {
  const itemId = request.params.id;
  const item = request.body;
  const result = await StudyItems.findByIdAndUpdate(itemId, { ...item });
  response.json(result);
}