const express = require("express")
const app = express()
app.use(express.json())

const notes=[]

// POST--note{title,description}
app.post('/notes',(req,res)=>{

 notes.push(req.body);

 res.status(201).json({
  message:"note created successfully"
 
 })
})

app.get('/notes',(req,res)=>{

 res.status(200).json({
  message: "notes fectched succesfully",
  notes:notes
 })
})

// delete -- /notes/:(dynamic part)
app.delete('/notes/:index',(req,res)=>{

 
 const index = req.params.index
 console.log(index);
 delete notes[index]

 res.status(200).json({
  message:"note deleted succesfully"
 })

})

module.exports = app