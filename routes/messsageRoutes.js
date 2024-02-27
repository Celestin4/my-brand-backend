const express = require("express");
const router = express.Router();

const {
  createMessage,
  getAllMessages,
  replyMessage
} = require("../controllers/messsageControllers");

router.post("/createMessage", createMessage);
router.get("/getAllMessages", getAllMessages);
router.post('/replyMessage', replyMessage)

module.exports = router;
