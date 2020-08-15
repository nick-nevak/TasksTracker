const Priorities = require('../Priority');

const priorities = [
  {
    value: 1,
    description: 'Very low'
  },
  {
    value: 2,
    description: 'Low'
  },
  {
    value: 3,
    description: 'Normal'
  },
  {
    value: 4,
    description: 'High'
  },
  {
    value: 5,
    description: 'Very high'
  }
]


module.exports = initializePriorities = async () => {
  const result = await Priorities.insertMany(priorities);
  console.log('inserted priorities:', result);
}