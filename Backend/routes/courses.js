const express = require('express');
const coursesRouter = express.Router();

const Courses = require('../models/courses');
const Order = require('../models/orderModel');

const { isAuth, isSellerOrAdmin } = require('../utils/utils.js');
const { uploadImage, upload } = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");

const { uploadFile, deleteFile, getFileStream } = require('../utils/s3');

//For File Deletion after upload
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

//Pipes the video to the frontend using the Get URL
coursesRouter.get('/image/:key', async (req, res) => {        
    try {
        const key = req.params.key;
        const readStream = await getFileStream(key);

        readStream.pipe(res)
    } catch (err) {
        console.log(err)
    }
});

//Return all courses
coursesRouter.get('/', async (req, res) => {
    try {
        const courses = await Courses.find();
        res.json(courses);
    } catch (err) {
        res.json({ message: err });
    }
});


//Return buyers purchase courses

coursesRouter.get('/purchased',
isAuth,
async (req, res) => {
    const Orders = await Order.find({ user: req.user._id });
    
    if (!Orders)
    return;
    
    try {
        let courseId=[];
        Orders.forEach(item => { 
            courseId.push({_id: item.orderItems[0].course});
        });

        console.log(courseId)
        if (courseId.length !== 0) {
            const orderedCourses= await Courses.find({$or: courseId});
            res.json(orderedCourses);
        } else {
            return res.status(404).json({ success: true, data: "Email Sent"});
        }

    } catch (err) {
        res.status(404).json({ success: true, data: "Email Sent"});
    }
});





//Return specific course
coursesRouter.get('/:id', async (req, res) => {
    try {
        const courses = await Courses.findById(req.params.id);
        res.json(courses);
    } catch (err) {
        res.json({ message: err });
    }
});

coursesRouter.delete('/:id', isAuth, isSellerOrAdmin, 
async (req, res) => {
    const courses = await Courses.findById(req.params.id);
    if (courses.seller!= req.user.id || !req.user.isAdmin)
        return;
    
    try {
        await deleteFile(courses.imageKey);
        const removedCourse = await Courses.remove({_id: req.params.id});
        res.json(removedCourse);
    } catch (err) {
        res.json({ message: err });
    }
});

coursesRouter.post('/create', 
isAuth, 
async (req, res) => {
    const course = new Courses({
        title: "Your Favourite Course",
        imageKey: "49fc119150ac284789beeb528136a3d5",
        description: "Sample Description",
        price: 997,
        star: 5,
        //seller: req.user._id
    });
    //Save to DB and respond with data (Testing) or errr
    try{
        const savedCourse = await course.save();
        res.json(savedCourse);
    } catch (err) {
        res.json({ message: err });
    }
});


coursesRouter.put('/:id', 
isAuth, 
uploadImage.single("image"), 
async (req, res) => {
    const courseId = req.params.id;
    const course = await Courses.findById(courseId);
    
    const file = req.file;
    const result = await uploadFile(file);

    await unlinkFile(file.path)

    if (course) {
      course.title = req.body.name;
      course.price = parseInt(req.body.price);
      course.image = result.Key;
      course.description = req.body.description;
      const updatedCourse = await course.save();
      res.send({ message: 'course Updated', course: updatedCourse });
    } else {
      //res.status(404).send({ message: 'Course Not Found' });
    }
  });


//Submit a course
coursesRouter.post('/', isAuth, 
async (req, res) => {
    const course = new Courses({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        star: req.body.star
    });
    //Save to DB and respond with data (Testing) or errr
    try{
        const savedCourse = await course.save();
        res.json(savedCourse);
    } catch (err) {
            res.json({ message: err });
    }
});

//Update a course
coursesRouter.patch('/:id', isAuth,
async (req, res) => {
    try {
        const updatedCourse = await Courses.updateOne(
            { _id: req.params.id},
            { $set: { title: req.body.title } }
        );
        res.json(updatedCourse);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = coursesRouter;