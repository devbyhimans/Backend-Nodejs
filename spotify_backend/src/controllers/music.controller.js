const musicModel = require('../models/music.model');
const JWT = require('jsonwebtoken');
const {uploadMusic} = require('../services/storage.service')
const albumModel = require('../models/album.model')


async function createMusic(req, res) {
  
    
    const decoded = req.user
    const title = req.body?.title;
    const file = req.file 
      
    
      if (!file) {
        return res.status(400).json({ message: 'Music file is required' });
      }

      const result = await uploadMusic(file.buffer);

      //creating to storing in database with the url
      const music = await musicModel.create({
       audioUrl: result.url,
       title,
       artist: decoded.id,
     });

      res.status(201).json({
       message:"music created successfully",
       music:{
        id:music._id,
        url:music.audioUrl,
        title:music.title,
        artist:music.artist
       }
      })
      
     
}


async function createAlbum( req,res){

    const decoded = req.user
    const {title,musics} = req.body;

    const album = await albumModel.create({
      title,
      artist:decoded.id,
      music:musics
    })


    res.status(201).json({
      message:"album created successfully"
    })
      

}

async function getAllMusic(req,res) {

  //limit(20) se basically hum prevent karte hai ek sath ek baar me hi saare songs lane me cause usse server ki memory full ho sakti hai aur server crash ho sakta hai , so hum 20-20 krke songs laate hai.
  
  const musics = await musicModel.find().limit(20).populate("artist","username email")

  res.status(200).json({
    message:"Musics fetched successfully",
    musics:musics,
  })
}

async function getAllAlbum(req,res) {
  
  const album = await albumModel.find().select("title artist").populate("artist","username")

  res.status(200).json({
    message:"Musics fetched successfully",
    album:album,
  })
}
 
async function getAlbumbyId(req,res) { 
  
  const albumId = req.params.albumId;

  const album = await albumModel.findById(albumId).populate("artist","username ,email").populate("music");

  return res.status(200).json({
    message:"Album fetched successfully",
    album:album,
  })

}



module.exports = {
  createMusic,
  createAlbum,
  getAllMusic,
  getAllAlbum,
  getAlbumbyId,
};