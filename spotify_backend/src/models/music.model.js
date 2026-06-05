const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    audioUrl: {  
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('music', musicSchema);