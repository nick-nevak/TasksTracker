const StudyItems = require('../models/StudyItem');

module.exports = getStudyItems = async (request, response) => {
  const result = await StudyItems.create({
    ...req.body
  });
  res.json(result);
}