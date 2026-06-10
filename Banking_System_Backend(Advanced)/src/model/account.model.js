const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"user",
  required:[true,"Account must be associated with a user"],
  index:true //to make searching fast
 },
 status:{
  type:String,
  enum:{
   values:["ACTIVE","FROZEN","CLOSED"],
   message:"Status can be either ACTIVE,FROZEN,CLOSED",
  },
  default:"ACTIVE"
 },
 currency:{
  type: String,
  required:[true,"Currency is required for creating a account"],
  default:"INR"
 }

 },{
  timestamps:true
})

//compound index
accountSchema.index({user:1,status:1})

const accountModel = mongoose.model("account",accountSchema)

module.exports = accountModel;