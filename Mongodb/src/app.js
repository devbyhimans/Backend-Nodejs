const express = require("express");
const noteModel = require("./models/note.model")

const app = express();
app.use(express.json()); // jab tak yeh middleware use nahi karenge tab tak request.body me data nahi ayega

// POST API - Create a new note
app.post("/notes", async (req, res) => {
  // Logic to create and save a new note
  const data = req.body /* {titel, description} */
  await noteModel.create({
   title:data.title,
   description:data.description
  })

   res.status(201).json({
    message:"Note created"
   })
});

//GET API - Retrieve all notes
app.get("/notes", async (req, res) => {  
  try {
    const notes = await noteModel.find()
    res.status(200).json({
   message:"notes fetched successfully",
   notes: notes
  })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
   
});

// PATCH API - Update an existing note
app.patch("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const updated = await noteModel.findByIdAndUpdate(
    "6a1dd3e79d1b945d4aeeb17e", 
    {"description": "Discuss project roadmap and action items"}, 
     { new: true })
    if (!updated) return res.status(404).json({ error: 'Note not found' })
    return res.json(updated)
  } catch (err) {
    console.error('PATCH /notes/:id error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
});

// DELETE API - Remove a note
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params
    const removed = await noteModel.findByIdAndDelete(id)
    if (!removed) return res.status(404).json({ error: 'Note not found' })
    return res.json({ message: 'Note deleted' })
  } catch (err) {
    console.error('DELETE /notes/:id error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
});

module.exports = app