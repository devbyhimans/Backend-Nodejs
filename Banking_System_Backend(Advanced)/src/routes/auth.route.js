const express = require('express')
const authcController = require('../controllers/auth.controller')
const router = express.Router();


router.post('/register',authcController.registerUser);









module.exports = router;