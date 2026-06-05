const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const userModel = require('../model/user.model');


//dummy route to to create a post and check if the cookie is being sent to the server or not
router.get('/create', async (req, res) => {

  const token = req.cookies.token;

  // Check if the token exists in the cookies
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token using the same secret key used to sign it
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Optionally, you can also check if the user exists in the database
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log(user);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.json({ 
   message: 'Post created successfully'});
});

module.exports = router;