const express = require('express');
const playlistRouter = express.Router();
const multer = require('multer');
const Playlist = require('../models/playlistModel');
const path = require('path');
const { isAuth, isSellerOrAdmin } = require('../utils/utils.js');
//const {UploadApiResponse} = require('cloudinary').v2;
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);


const cloudinary = require("../utils/cloudinary");
const { uploadImage, uploadVideo, upload } = require("../utils/multer");

//const multer = require("multer");

//const storage = multer.diskStorage({}); 

//let upload = multer({ storage })

const { uploadFile, deleteFile, getFileStream } = require('../utils/s3');

/*
playlistRouter.get('/test/:key', (req, res) => {        
    try {
        const key = req.params.key;
        const readStream = getFileStream(key);

        readStream.pipe(res)
    } catch (err) {
        console.log(err)
    }
});

playlistRouter.post('/test', 
upload.single('video'), 
async (req, res) => {
    try {
        const file = req.file;
        console.log(file);
        const result = await uploadFile(file);
        await unlinkFile(file.path)
        console.log(result);
        const description = req.body.description;
        res.send({imagePath: `/images/${result.Key}`});
        //const result = await cloudinary.uploader.upload(req.file.data);
        //res.json(result);
    } catch (err) {
        console.log(err)
    }
});



playlistRouter.delete('/test', async (req, res) => {
    try {
        deleteFile('a26a1627c3b5852424ec5b84e34c305b')
        //res.send({imagePath: `/images/${result.Key}`});
    } catch (err) {
        console.log(err)
    }
});


playlistRouter.delete('/test', async (req, res) => {
    try {
        const result = await cloudinary.uploader.destroy("b3wnefa7lja37hobxwpk");
        res.json(result);
    } catch (err) {
        console.log(err)
    }
});

*/


//Global Compare Sort Function
function compare(a, b) {
    const bandA = a.Number;
    const bandB = b.Number;
            
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return comparison;
}



//Pipes the video to the frontend using the Get URL
playlistRouter.get('/video/:key', async (req, res) => {        
    try {
        const key = req.params.key;
        const readStream = await getFileStream(key);

        readStream.pipe(res)
    } catch (err) {
        console.log(err)
    }
});



//Return specific playlist
playlistRouter.get('/:courseId', 
isAuth, 
async (req, res) => {
    try {
        //const playlist = await Playlist.findById(req.params.id);
        const playlist = await Playlist.findOne({ Course: req.params.courseId });
        playlist.videoplaylist=playlist.videoplaylist.sort(compare);
        res.json(playlist);
    } catch (err) {
        res.json({ message: err });
    }
});

playlistRouter.post("/create/:courseId", async (req, res) => {
    const courseId = req.params.courseId;
    const playlist = new Playlist ({
        Course: courseId,
    });
    try {
        const savedPlaylist = await playlist.save();
        savedPlaylist.videoplaylist=savedPlaylist.videoplaylist.sort(compare);
        res.json(savedPlaylist);
    } catch (err) {
        res.json({ message: err });
    }
});

//Fix Playlist
playlistRouter.put('/:courseId', 
isAuth, 
isSellerOrAdmin, 
upload.single("video"), 
async (req, res) => {
    const playlist = await Playlist.findOne({ Course: req.params.courseId });
    if (playlist) {
        try{
            const file = req.file;
            const result = await uploadFile(file);
            
            playlist.videoplaylist = [
                ...playlist.videoplaylist,
                {
                    Number: playlist.videoplaylist.length+1,
                    Title: req.body.Title,
                    Description: req.body.Description,
                    Key: result.Key,
                }
            ];  
            playlist.Thumbnail = req.body.Thumbnail;
            const updatedPlaylist = await playlist.save();
            updatedPlaylist.videoplaylist=updatedPlaylist.videoplaylist.sort(compare);
            res.send({ message: 'Playlist Updated', playlist: updatedPlaylist });
            
        } catch(error) {
            console.log(error);
        }
    } else {
        res.status(404).send({ message: 'Playlist Not Found' });
    }
  });


  //Move Videos in playlist up and down
playlistRouter.put('/arrange/:courseId', 
isAuth, 
async (req, res) => {

    const up = req.body.up;
    const down = req.body.down;
    const numToUpdate = req.body.numToUpdate;
    console.log('up is'+up);
    console.log('down is' + down);
    console.log('num is' + numToUpdate);

    const playlist = await Playlist.findOne({ Course: req.params.courseId });
    
    if (!playlist)
        return res.status(404).send({ message: 'Playlist Not Found' });
        
    
    if (numToUpdate === 1 && up) 
        return res.status(404).send({ message: 'This is the First Video in the playlist' });
    

    if (numToUpdate === playlist.videoplaylist.length && down)
        return res.status(404).send({ message: 'This is the Last Video in the playlist' });

    try{
        if (up) {
            let numToUpdateIndex = playlist.videoplaylist.findIndex(
                item => item.Number === numToUpdate
            );
            let secondNumToUpdateIndex = playlist.videoplaylist.findIndex(
                item => item.Number === (numToUpdate - 1)
            );
                        
            playlist.videoplaylist[numToUpdateIndex].Number -= 1;
            playlist.videoplaylist[secondNumToUpdateIndex].Number += 1;
        }
        
        if (down) {
            let numToUpdateIndex = await playlist.videoplaylist.findIndex(
                item => item.Number == numToUpdate
                );
            
            console.log('num '+numToUpdate)
            console.log('First index' + numToUpdateIndex);
            
            let secondNumToUpdateIndex = await playlist.videoplaylist.findIndex(
                item => item.Number == (numToUpdate + 1)
            );

            console.log(secondNumToUpdateIndex);

            playlist.videoplaylist[numToUpdateIndex].Number += 1;
            playlist.videoplaylist[secondNumToUpdateIndex].Number -= 1;
        }
    } catch (error) {
        console.log(error);
    }

      const updatedPlaylist = await playlist.save();
      updatedPlaylist.videoplaylist=updatedPlaylist.videoplaylist.sort(compare);
      console.log(updatedPlaylist.videoplaylist);
      res.send({ message: 'Playlist Updated', playlist: updatedPlaylist });
  
  });



  //Move Videos in playlist up and down
playlistRouter.put('/updateVideoDetails/:courseId', 
isAuth, 
async (req, res) => {
    const numToUpdate = req.body.numToUpdate;

    const playlist = await Playlist.findOne({ Course: req.params.courseId });
    
    if (!playlist)
        return res.status(404).send({ message: 'Playlist Not Found' });
        
    try{
        let numToUpdateIndex = await playlist.videoplaylist.findIndex(
            item => item.Number == numToUpdate
        );
        playlist.videoplaylist[numToUpdateIndex].Title = req.body.title;
        playlist.videoplaylist[numToUpdateIndex].Description = req.body.description; 
        playlist.Thumbnail = req.body.Thumbnail;
    } catch (error) {
        console.log(error);
    }

    const updatedPlaylist = await playlist.save();
    updatedPlaylist.videoplaylist=updatedPlaylist.videoplaylist.sort(compare);
    res.send({ message: 'Playlist Updated', playlist: updatedPlaylist });
});




playlistRouter.patch('/remove/:courseId', 
isAuth, isSellerOrAdmin, 
async (req, res) => {
    const NumberToRemove = parseInt(req.body.numberToRemove);

    const playlist = await Playlist.findOne({ Course: req.params.courseId });
    
    if (!playlist)
        return res.status(404).send({ message: 'Playlist Not Found' });

    try {
        let numToDeleteIndex = playlist.videoplaylist.findIndex(
                item => item.Number == NumberToRemove
        );

        await deleteFile(playlist.videoplaylist[numToDeleteIndex].Key);

        playlist.videoplaylist = playlist.videoplaylist.filter((item) => {
            return item.Number !== NumberToRemove;
        })   
      
        const updatedPlaylist = await playlist.save();
        updatedPlaylist.videoplaylist = updatedPlaylist.videoplaylist.sort(compare);
        res.send({ message: 'Playlist Updated', playlist: updatedPlaylist });
    } catch (error) {
        console.log(error);
    }
  });

module.exports = playlistRouter;
