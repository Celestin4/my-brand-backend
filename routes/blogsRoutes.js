const express = require('express');
const router = express.Router();
const {createPost, deletePost, updatePost, getAllPosts, getSinglePost} = require('../controllers/blogsControllers');
const upload = require('../multer/config');


router.post('/createBlogPost', upload.single('image'), createPost);
router.delete('/deleteBlogPost/:blogPostId', deletePost)
router.put('/updateBlogPost/:blogPostId', updatePost)
router.get('/getAllPosts', getAllPosts)
router.get('/getSinglePost/:blogPostId', getSinglePost)

module.exports = router;