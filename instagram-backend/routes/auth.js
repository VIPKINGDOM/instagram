const express = require('express');
const User = require('../models/User');

const router = express.Router();

// POST /api/login  — saves whatever was submitted on the login form
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'username and password are required' });
    }

    const saved = await User.create({ username, password });

    return res.status(201).json({
      message: 'Saved to MongoDB',
      id: saved._id,
      username: saved.username,
      createdAt: saved.createdAt,
    });
  } catch (err) {
    console.error('Login save error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/logins — lists saved entries (handy for testing in Postman/browser)
router.get('/login', async (req, res) => {
  try {
    const entries = await User.find().sort({ createdAt: -1 }).select('-password');
    return res.json(entries);
  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;