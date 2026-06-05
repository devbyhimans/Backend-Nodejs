const mongoose = require('mongoose');

async function connectDB() {

  // URI/database_name
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error('Database connection error:', error);
  }

 console.log("connected to the database")
}


module.exports = connectDB;
