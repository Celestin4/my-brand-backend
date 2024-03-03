const express = require("express");
const router = express.Router();
const {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getSinglePost,
  likeBlogPost,
  shareBlogPost,
  updateViews,
  addCommentToPost,
} = require("../controllers/blogsControllers");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

const upload = require("../multer/config");

router.post(
  "/createBlogPost",
  isAuthenticated,
  isAdmin,
  upload.upload.single("blogImage"),
  createPost
);
router.delete(
  "/deleteBlogPost/:blogPostId",
  isAuthenticated,
  isAdmin,
  deletePost
);
router.put(
  "/updateBlogPost/:blogPostId",
  isAuthenticated,
  isAdmin,
  upload.upload.single("updatedBlogImage"),
  updatePost
);
router.get("/getAllPosts", getAllPosts);
router.get("/getSinglePost/:blogPostId", getSinglePost);
router.post("/like", isAuthenticated, likeBlogPost);
router.post("/share", isAuthenticated, shareBlogPost);
router.post("/view", updateViews);
router.post("/comment/:postId", isAuthenticated, addCommentToPost);

module.exports = router;
