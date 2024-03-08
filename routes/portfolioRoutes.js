const express = require("express");
const router = express.Router();
const {
  createPortfolio,
  getPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioControllers");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../multer/config");



/**
 * @swagger
 * /api/portfolio:
 *   post:
 *     summary: Create a new portfolio
 *     tags: [Portfolios]
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
 *               image:
 *                 type: string
 *                 format: binary
 *               githubLink:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Portfolio created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 image:
 *                   type: string
 *                 githubLink:
 *                   type: string
 *       '400':
 *         description: Bad request. Error message provided.
 */

router.post("/", isAuthenticated, isAdmin, upload.upload.single("image"), createPortfolio);

/**
 * @swagger
 * /api/portfolio:
 *   get:
 *     summary: Retrieve all portfolios
 *     tags: [Portfolios]
 *     responses:
 *       '200':
 *         description: A list of portfolios retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   image:
 *                     type: string
 *                   githubLink:
 *                     type: string
 *       '500':
 *         description: Internal server error. Error message provided.
 */

router.get("/", getPortfolios);

/**
 * @swagger
 * /api/portfolio/{id}:
 *   get:
 *     summary: Retrieve a specific portfolio by ID
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the portfolio to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Portfolio retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 image:
 *                   type: string
 *                 githubLink:
 *                   type: string
 *       '404':
 *         description: Portfolio not found. Error message provided.
 *       '500':
 *         description: Internal server error. Error message provided.
 */

router.get("/:id", getPortfolioById);

/**
 * @swagger
 * /api/portfolio/{id}:
 *   put:
 *     summary: Update a portfolio by ID
 *     tags: [Portfolios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the portfolio to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               updatedImage:
 *                 type: string
 *                 format: binary
 *               githubLink:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Portfolio updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 image:
 *                   type: string
 *                 githubLink:
 *                   type: string
 *       '400':
 *         description: Bad request. Error message provided.
 *       '404':
 *         description: Portfolio not found. Error message provided.
 */

router.put("/:id", isAuthenticated, isAdmin, upload.upload.single("updatedImage"), updatePortfolio);

/**
 * @swagger
 * /api/portfolio/{id}:
 *   delete:
 *     summary: Delete a portfolio by ID
 *     tags: [Portfolios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the portfolio to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Portfolio deleted successfully
 *       '404':
 *         description: Portfolio not found. Error message provided.
 *       '500':
 *         description: Internal server error. Error message provided.
 */

router.delete("/:id", isAuthenticated, isAdmin, deletePortfolio);

module.exports = router;
