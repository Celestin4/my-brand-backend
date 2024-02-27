const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  fullName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  subject: {
    required: true,
    type: String,
  },
  message: {
    required: true,
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdAt: Date
});

module.exports = mongoose.model('Message', messageSchema);
