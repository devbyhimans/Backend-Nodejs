const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


// Register route
router.post('/register',authController.registerUser);



module.exports = router;