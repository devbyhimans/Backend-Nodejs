const app = require("./src/app")
const connectDB = require("./src/database/db")

//making connection to database
connectDB()


app.listen(3000,()=>{
 console.log("server is running on port 3000")
})