/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management
 */


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


router.get("/", getAllPosts);

router.get("/:blogPostId", getSinglePost);
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  upload.upload.single("blogImage"),
  createPost
);
router.put(
  "/:blogPostId",
  isAuthenticated,
  isAdmin,
  upload.upload.single("updatedBlogImage"),
  updatePost
);
router.delete("/:blogPostId", isAuthenticated, isAdmin, deletePost);
router.post("/like", isAuthenticated, likeBlogPost);
router.post("/share", isAuthenticated, shareBlogPost);
router.post("/view", updateViews);
router.post("/comment/:postId", isAuthenticated, addCommentToPost);

module.exports = router;
