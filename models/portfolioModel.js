const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  githubLink: {
    type: String,
    required: true
  }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
