const express = require('express');
const router = express.Router();

const {createMessage, getAllMessages} = require('../controllers/messsageControllers')

router.post('/createMessage', createMessage)
router.get('/getAllMessages', getAllMessages)

module.exports = router;