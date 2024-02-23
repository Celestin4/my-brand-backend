const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getAllUsers, deleteUser, getSingleUser} = require('../controllers/userControllers');

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/listOfUsers', getAllUsers)
router.get('/getSingleUser/:email', getAllUsers)
router.delete('/deleteUser/:userId', deleteUser)

module.exports = router;