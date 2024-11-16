// backend/routes/familyRoutes.js
const express = require('express');
const FamilyMember = require('../models/FamilyMember');
const multer = require('multer');
const { getNextFamilyMemberId } = require('../utils/counterHelper');  // Import the helper function
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Adjust destination as needed

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await FamilyMember.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new member (with sequential ID)
router.post('/', async (req, res) => {
  try {
    // Get the next available sequential ID
    const id = await getNextFamilyMemberId();

    // Create a new family member object with the sequential ID
    const member = new FamilyMember({
      id,  // Use the sequential ID here
      ...req.body,  // Spread other fields from the request body
    });

    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a member
router.put('/:id', async (req, res) => {
  try {
    const member = await FamilyMember.findOneAndUpdate(
      { id: req.params.id },  // Use the custom `id` field
      req.body,
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a member
router.delete('/:id', async (req, res) => {
  try {
    const member = await FamilyMember.findOneAndDelete({ id: req.params.id });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST to upload a photo
router.post('/:id/photo', upload.single('photo'), async (req, res) => {
  try {
    const member = await FamilyMember.findOne({ id: req.params.id });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    member.photo = req.file.path;
    await member.save();
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get the family tree (recursive structure)
router.get('/tree', async (req, res) => {
  try {
    const buildTree = async (parentId = null) => {
      const members = await FamilyMember.find({ parentIds: parentId });
      return Promise.all(
        members.map(async (member) => ({
          ...member.toObject(),
          children: await buildTree(member.id),  // Use `id` here instead of MongoDB's `_id`
        }))
      );
    };
    const tree = await buildTree();
    res.json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
