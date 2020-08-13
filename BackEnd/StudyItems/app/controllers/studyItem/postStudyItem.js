const StudyItems = require('../../models/StudyItem');

module.exports = getStudyItems = async (request, response) => {
  const result = await StudyItems.create({
    ...request.body
  });
  response.json(result);
}