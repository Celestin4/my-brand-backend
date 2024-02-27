const  Portfolio = require("../models/portfolioModel");

// Create a new portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const { title, githubLink } = req.body;
    const portfolioImage = req.file.filename;
    const portfolio = new Portfolio({ title, image: portfolioImage, githubLink });
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all portfolios
exports.getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific portfolio by ID
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a portfolio by ID
exports.updatePortfolio = async (req, res) => {
  try {
    const { title,  githubLink } = req.body;
    const portfolio = await Portfolio.findById(req.params.id);
    const updatedImage = req.file.filename
    console.log(updatedImage)
    
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    if (title) portfolio.title = title;
    if (updatedImage) portfolio.image = updatedImage;
    if (githubLink) portfolio.githubLink = githubLink;
    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a portfolio by ID
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    await Portfolio.deleteOne({ _id: req.params.id });
    res.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
