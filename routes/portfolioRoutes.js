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

const upload = require("../multer/config");

router.post("/createPortfolio", upload.upload.single("image"), createPortfolio);

router.get("/getAllPortfolios", getPortfolios);

router.get("/getSinglePortfolio/:id", getPortfolioById);

router.put("/updatePortfolio/:id", upload.upload.single("updatedImage"), updatePortfolio);

router.delete("/deletePortfolio/:id", deletePortfolio);

module.exports = router;
