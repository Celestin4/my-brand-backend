const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getAllUsers, deleteUser, getSingleUser} = require('../controllers/userControllers');
const {isAuthenticated, isAdmin} = require('../middleware/authMiddleware');

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/listOfUsers', isAuthenticated, isAdmin, getAllUsers)
router.get('/getSingleUser/:email', isAuthenticated, isAdmin, getAllUsers)
router.delete('/deleteUser/:userId', isAuthenticated, isAdmin, deleteUser)

module.exports = router;