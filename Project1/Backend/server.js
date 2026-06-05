// load environment variables from .env
require('dotenv').config()//this will load the environment variables from .env file and make them available in process.env

const app = require("./src/app")
const connectDB = require("./db/db")

connectDB();





app.listen(3000,()=>{
 console.log("Server is running on port 3000");
});