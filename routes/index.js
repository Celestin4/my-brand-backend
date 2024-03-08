const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogsRoutes");
const portfolioRoutes = require("./portfolioRoutes");
const messageRoutes = require("./messsageRoutes");
const subscriptionRoutes = require("./subscriptionRoutes");


router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/messages", messageRoutes);
router.use("/subscribe", subscriptionRoutes);
router.use("/subscribe", subscriptionRoutes);

module.exports = router;
