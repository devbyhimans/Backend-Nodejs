const express = require("express");
const multer = require("multer");
const uploadImage = require("../services/storage.service");
const postModel = require("../model/post.model")
const cors = require("cors");

const app = express();
//cors middleware to allow requests from frontend
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Multer setup for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
});

app.post(
  "/create-post",
  upload.single("image"),
  async (req, res) => {
    try {
      const { caption } = req.body;

      if (!req.file) {
        return res.status(400).json({
          message: "Image is required",
        });
      }

      const result = await uploadImage(req.file);

      // Save post to MongoDB
      const post = await postModel.create({
        image: result.url,
        caption,
      });

      return res.status(201).json({
        message: "Post created successfully",
        imageUrl: result,
        post: post
      });
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get("/posts", async (req, res) => {
  // Logic to fetch and return all posts
  const posts = await postModel.find() 

  res.status(200).json({ 
   message: "Posts fetched successfully",
   posts: posts 
  });
});

module.exports = app;