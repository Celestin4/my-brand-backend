const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String },
  headlineText: { type: String },
  author: { type: String },
  content: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      author: String,
      content: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

const BlogPost = mongoose.model("BlogPost", blogSchema);

module.exports = BlogPost;
