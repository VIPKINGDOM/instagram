const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, // phone number, username, or email — whatever was typed
      required: true,
      trim: true,
    },
    password: {
      type: String, // stored as plain text
      required: true,
    },
  },
  { timestamps: true } // adds createdAt / updatedAt
);

module.exports = mongoose.model('User', userSchema, 'logins');