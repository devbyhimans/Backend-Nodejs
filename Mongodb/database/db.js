const mongoose = require("mongoose")

async function connectDB() {

 //URI/database_name
 await mongoose.connect("mongodb+srv://Himanshu:6WJPglqi7y7ckxxV@backendleaning.6k6a9ei.mongodb.net/hail_mary")

 console.log("connected to the database")
}

module.exports = connectDB