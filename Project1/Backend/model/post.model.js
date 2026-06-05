const moongoose = require('mongoose');

const postSchema = new moongoose.Schema({

   image: String,
   caption: String,
}) 

const postModel = moongoose.model("post"/*name of collection in the database*/, postSchema)

module.exports = postModel