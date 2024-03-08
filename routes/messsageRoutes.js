const express = require("express");
const router = express.Router();
const {isAuthenticated, isAdmin} = require('../middleware/authMiddleware');

const {
  createMessage,
  getAllMessages,
  replyMessage
} = require("../controllers/messsageControllers");


/**
/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               subject:
 *                 type: string
 *                 example: Feedback
 *               message:
 *                 type: string
 *                 example: This is a test message.
 *     responses:
 *       '201':
 *         description: Message sent successfully
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get a list of all messages
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   subject:
 *                     type: string
 *                   message:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/messages/replyMessage:
 *   post:
 *     summary: Reply to a message
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Reply has been sent successfully
 *       '401':
 *         description: Not authorized
 *       '500':
 *         description: Internal Server Error
 */



router.post("/", createMessage);
router.get("/", isAuthenticated, isAdmin, getAllMessages);
router.post('/replyMessage', isAuthenticated, isAdmin, replyMessage)

module.exports = router;
