// portfolioRoutes.js

const express = require("express");
const router = express.Router();

const {
  createPortfolio,
  getPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioControllers");
const {isAuthenticated, isAdmin} = require('../middleware/authMiddleware');

const upload = require("../multer/config");

router.post("/createPortfolio",isAuthenticated, isAdmin, upload.upload.single("image"), createPortfolio);

router.get("/getAllPortfolios", getPortfolios);

router.get("/getSinglePortfolio/:id", getPortfolioById);

router.put("/updatePortfolio/:id", isAuthenticated, isAdmin, upload.upload.single("updatedImage"), updatePortfolio);

router.delete("/deletePortfolio/:id", isAuthenticated, isAdmin, deletePortfolio);

module.exports = router;
