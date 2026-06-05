const dotenvResult = require('dotenv').config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set. Please add JWT_SECRET to your .env file.');
}
const app = require('./src/app');
const connectDB = require('./src/db/db');

// Connect to the database
connectDB();








app.listen(3000, () => {
  console.log('Server is running on port 3000');
});