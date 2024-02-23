const BlogPost = require("../models/blogsModel");

const createPost = async (req, res) => {
  try {
    const { title, headlineText, content, date } = req.body;
    const imageUrl = req.file ? req.file.path : ""; // Get the path of the uploaded image
    const author = req.body.author || "Admin";
    const blogPost = await BlogPost.create({
      title,
      headlineText,
      author,
      content,
      date,
      imageUrl,
      likes: 0,
      shares: 0,
      views: 0,
      comments: [],
    });
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
};
const deletePost = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const deletedPost = await BlogPost.findByIdAndDelete(blogPostId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully", blogPostId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const { title, headlineText, author, content, date, imageUrl } = req.body;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      blogPostId,
      { title, headlineText, author, content, date, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allBlogPosts = await BlogPost.find();
    res.json(allBlogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const blogPost = await BlogPost.findById(blogPostId);
    if (!blogPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getSinglePost,
};
