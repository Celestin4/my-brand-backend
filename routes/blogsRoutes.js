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

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blog posts
 *     description: Retrieve all blog posts
 *     tags: [BlogPosts]
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get("/", getAllPosts);

/**
 * @swagger
 * /api/blogs/{blogPostId}:
 *   get:
 *     summary: Get a single blog post
 *     description: Retrieve a single blog post by its ID
 *     tags: [BlogPosts]
 *     parameters:
 *       - in: path
 *         name: blogPostId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Blog post not found
 */
router.get("/:blogPostId", getSinglePost);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog post
 *     description: Create a new blog post
 *     tags: [BlogPosts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               headlineText:
 *                 type: string
 *               content:
 *                 type: string
 *               blogImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Blog post created successfully
 *       '401':
 *         description: Not authorized
 */

router.post("/", isAuthenticated, isAdmin, upload.upload.single("blogImage"), createPost);

/**
 * @swagger
 * /api/blogs/{blogPostId}:
 *   put:
 *     summary: Update a blog post
 *     description: Update an existing blog post
 *     tags: [BlogPosts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogPostId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               headlineText:
 *                 type: string
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *               updatedBlogImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Blog post updated successfully
 *       '401':
 *         description: Not authorized
 *       '404':
 *         description: Blog post not found
 */
router.put("/:blogPostId", isAuthenticated, isAdmin, upload.upload.single("updatedBlogImage"), updatePost);

/**
 * @swagger
 * /api/blogs/{blogPostId}:
 *   delete:
 *     summary: Delete a blog post
 *     description: Delete an existing blog post
 *     tags: [BlogPosts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogPostId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post
 *     responses:
 *       '200':
 *         description: Blog post deleted successfully
 *       '401':
 *         description: Not authorized
 *       '404':
 *         description: Blog post not found
 */
router.delete("/:blogPostId", isAuthenticated, isAdmin, deletePost);

/**
 * @swagger
 * /api/blogs/like:
 *   post:
 *     summary: Like or unlike a blog post
 *     description: Like or unlike a blog post
 *     tags: [BlogPosts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               blogId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Like/unlike operation successful
 *       '401':
 *         description: Not authorized
 *       '404':
 *         description: Blog post not found
 */
router.post("/like", isAuthenticated, likeBlogPost);

/**
 * @swagger
 * /api/blogs/share:
 *   post:
 *     summary: Share a blog post
 *     description: Share a blog post
 *     tags: [BlogPosts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Blog post shared successfully
 *       '401':
 *         description: Not authorized
 *       '404':
 *         description: Blog post not found
 */
router.post("/share", isAuthenticated, shareBlogPost);

/**
 * @swagger
 * /api/blogs/view:
 *   post:
 *     summary: Update views of a blog post
 *     description: Update views of a blog post
 *     tags: [BlogPosts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Views updated successfully
 *       '404':
 *         description: Blog post not found
 */
router.post("/view", updateViews);

/**
 * @swagger
 * /api/blogs/comment/{postId}:
 *   post:
 *     summary: Add a comment to a blog post
 *     description: Add a comment to a blog post
 *     tags: [BlogPosts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Comment added successfully
 *       '401':
 *         description: Not authorized
 *       '404':
 *         description: Blog post not found
 */
router.post("/comment/:postId", isAuthenticated, addCommentToPost);

module.exports = router;
