const userModel = require('../model/user.model');
const JWT = require('jsonwebtoken');

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' });
  }
  
  // Create user in the database
  const user = await userModel.create({ username, email, password });

  // Generate JWT token
  const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

  // Set the token in a cookie
  res.cookie('token', token);
  
  res.status(201).json({ message: 'User registered successfully', user });
}

module.exports = {
  registerUser,
};