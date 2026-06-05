require('dotenv').config(); // Load environment variables from .env file
const connectDB = require('./src/db/db');
const app = require('./src/app');

connectDB();





app.listen(3000, () => {
  console.log('Server running on port 3000');
}); 
