const userModel = require('../models/user.model');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function register(req, res) {
  const { username, email, password, role='user' } = req.body;

  // Check if the user already exists with the same username or email 
  const existingUser = await userModel.findOne({
   // Use $or operator to check for either email or username , earlier if two users had same username or different email or vice versa it was creating two different accounts but now it will check for both and if either of them is already in use it will return an error 
   $or: [
    { email }, 
    { username }
   ]
   });
  
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Hash the password before saving to the database
  const hashedPassword = await bcrypt.hash(password, 10/* salt rounds */);

  // Create user in the database
  const user = await userModel.create({ username, email, password: hashedPassword, role });

  // Generate JWT token
  const token = JWT.sign({ 
   id: user._id,
   role: user.role 
  }, process.env.JWT_SECRET); 

  // Set the token in a cookie
  res.cookie('token', token);

  res.status(201).json({ message: 'User registered successfully', 
   user:{
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
   }
   });
}

async function login(req, res) {
  const { username, email, password } = req.body; 

  const user = await userModel.findOne({ 
   $or: [
    { username },
    { email }
  ]
   });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare the provided password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Wrong password' });
  }

  // Generate JWT token
  const token = JWT.sign({ 
   id: user._id,
   role: user.role 
  }, process.env.JWT_SECRET);

  // Set the token in a cookie
  res.cookie('token', token);

  res.json({ message: 'Login successful', 
   user:{
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
   }
   });
}

async function logout(req,res) {
  res.clearCookie("token")
  
  return res.status(200).json({
    message:"User logged out successfully"
  })
}

module.exports = {
  register,
  login,
  logout,
};


