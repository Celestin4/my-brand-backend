const express = require("express");
const router = express.Router();
const {isAuthenticated, isAdmin} = require('../middleware/authMiddleware');

const {
  createMessage,
  getAllMessages,
  replyMessage
} = require("../controllers/messsageControllers");

router.post("/createMessage", createMessage);
router.get("/getAllMessages", isAuthenticated, isAdmin, getAllMessages);
router.post('/replyMessage', isAuthenticated, isAdmin, replyMessage)

module.exports = router;
