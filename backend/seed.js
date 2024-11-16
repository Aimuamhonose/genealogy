const mongoose = require('mongoose');
const FamilyMember = require('./models/FamilyMember');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB Connected');

  await FamilyMember.deleteMany();
  await Admin.deleteMany();

  const admin = new Admin({ username: 'admin', password: 'password' }); // Hash in production
  await admin.save();

  const rootMember = new FamilyMember({ name: 'John Doe', bio: 'Root of the family tree' });
  await rootMember.save();

  console.log('Seeding Complete');
  process.exit();
};

seedData();
