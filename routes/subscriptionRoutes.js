const express = require('express');
const router = express.Router();

const {subscribe} = require("../controllers/subscriptionControllers")

router.post('/', subscribe)

module.exports = router;