const BlogPost = require("../models/blogsModel");
const upload = require("../multer/config");

const createPost = async (req, res) => {
  try {
    const { title, headlineText, content } = req.body;
    console.log(req.body);
    const blogImage = req.file.filename;
    const author = req.body.author || "Admin";
    const blogPost = await BlogPost.create({
      title,
      headlineText,
      author,
      content,
      imageUrl: blogImage,
      createdAt: Date.now(),
      likes: [],
      shares: [],
      views: [],
      comments: [],
    });
    res.json(blogPost);
  } catch (error) {
    console.log(req.body);

    res.status(500).json({ error: error.message });
  }
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
    const { title, headlineText, author, content, date } = req.body;
    const updatedBlogImage = req.file.filename;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      blogPostId,
      {
        title,
        headlineText,
        author,
        content,
        date,
        imageUrl: updatedBlogImage,
      },
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
    res.status(201).json(allBlogPosts);
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

async function likeBlogPost(req, res) {
  try {
    const { userId, blogId } = req.body;
    const post = await BlogPost.findById(blogId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    // Check if the user has already liked the post
    const index = post.likes.indexOf(userId);
    if (index !== -1) {
      // If user already liked the post, remove the like
      post.likes.splice(index, 1);
      await post.save();
      return res
        .status(200)
        .json({ success: true, message: "Blog post unliked successfully" });
    } else {
      // If user has not liked the post, add the like
      post.likes.push(userId);
      await post.save();
      return res
        .status(200)
        .json({ success: true, message: "Blog post liked successfully" });
    }
  } catch (error) {
    console.error("Error liking/unliking blog post:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while liking/unliking the blog post",
    });
  }
}

async function shareBlogPost(req, res) {
  try {
    const { blogId, userId } = req.body;
    const post = await BlogPost.findById(blogId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    post.shares.push(userId);
    await post.save();

    return res
      .status(200)
      .json({ success: true, message: "Blog post shared successfully" });
  } catch (error) {
    console.error("Error sharing blog post:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while sharing the blog post",
    });
  }
}

async function updateViews(req, res) {
  try {
    const { blogId, userId } = req.body;
    const post = await BlogPost.findById(blogId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    post.views.push(userId);
    await post.save();

    return res
      .status(200)
      .json({ success: true, message: "Views updated successfully" });
  } catch (error) {
    console.error("Error updating views:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating views",
    });
  }
}

const addCommentToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { author, content } = req.body;

    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const newComment = { author, content };
    blogPost.comments.push(newComment);
    await blogPost.save();

    res
      .status(201)
      .json({ message: "Comment added to blog post", comment: newComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getSinglePost,
  likeBlogPost,
  shareBlogPost,
  updateViews,
  addCommentToPost,
};
