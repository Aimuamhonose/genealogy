const Counter = require('../models/Counter');

async function getNextFamilyMemberId() {
  const counter = await Counter.findOneAndUpdate(
    { name: 'familyMemberId' },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
  return counter.count;
}

module.exports = { getNextFamilyMemberId };
