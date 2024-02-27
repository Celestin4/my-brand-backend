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
  addCommentToPost
} = require("../controllers/blogsControllers");

const upload = require("../multer/config");

router.post("/createBlogPost", upload.upload.single("blogImage"), createPost);
router.delete("/deleteBlogPost/:blogPostId", deletePost);
router.put(
  "/updateBlogPost/:blogPostId",
  upload.upload.single("updatedBlogImage"),
  updatePost
);
router.get("/getAllPosts", getAllPosts);
router.get("/getSinglePost/:blogPostId", getSinglePost);
router.post("/like", likeBlogPost);
router.post("/share", shareBlogPost);
router.post("/view", updateViews);
router.post("/comment/:postId", addCommentToPost);

module.exports = router;
