const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const Admin = require('../models/Admin');

router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if username already exists
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Save admin to the database
      const newAdmin = new Admin({ username, password: hashedPassword });
      await newAdmin.save();
  
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Fetch the admin record
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Validate password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
  
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
  });
  

module.exports = router;
