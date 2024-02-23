const mongoose = require('mongoose');

// Define the schema
const blogSchema = new mongoose.Schema({
    title: String,
    headlineText: String, // Added headlineText field
    author: String,
    content: String,
    date: String,
    imageUrl: String,
    likes: { type: Number, default: 0 }, // Default value for likes
    shares: { type: Number, default: 0 }, // New field shares with default value 0
    views: { type: Number, default: 0 }, // New field views with default value 0
    comments: [{ 
        author: String,
        content: String,
        date: { type: Date, default: Date.now }
    }]
});

// Create the BlogPost model
const BlogPost = mongoose.model('BlogPost', blogSchema);

module.exports = BlogPost;
