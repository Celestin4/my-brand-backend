const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogsRoutes");
const portfolioRoutes = require("./portfolioRoutes");
const messageRoutes = require("./messsageRoutes");

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/portfolios", portfolioRoutes);
router.use("/messages", messageRoutes);

module.exports = router;
