const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  photo: { type: String },
  birthDate: { type: Date },
  deathDate: { type: Date },
  parentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember' }],
  childrenIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember' }],
  bio: { type: String },
});

module.exports = mongoose.model('FamilyMember', FamilyMemberSchema);

