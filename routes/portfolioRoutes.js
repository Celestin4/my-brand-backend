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


router.post("/createPortfolio", createPortfolio);

router.get("/getAllPortfolios", getPortfolios);

router.get("/getSinglePortfolio/:id", getPortfolioById);

router.put("/updatePortfolio/:id", updatePortfolio);

router.delete("/deletePortfolio/:id", deletePortfolio);

module.exports = router;
