const express = require('express');
const blogsRouter = express.Router();
const Blogs = require('../models/blogs');
const multer = require('multer');
const path = require('path');
const { isAuth, isAdmin } = require('../utils/utils.js');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    },
})
 
const upload = multer({ storage: storage }).single("video")

//Return all blogs
blogsRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blogs.find();
        res.json(blogs);
    } catch (err) {
        res.json({ message: err });
    }
});

//Return specific blog
blogsRouter.get('/:id', async (req, res) => {
    try {
        const blogs = await Blogs.findById(req.params.id);
        res.json(blogs);
    } catch (err) {
        res.json({ message: err });
    }
});

blogsRouter.delete('/:id', isAuth, isAdmin , async (req, res) => {
    try {
        const removedBlog = await Blogs.remove({_id: req.params.id});
        res.json(removedBlog);
    } catch (err) {
        res.json({ message: err });
    }
});

blogsRouter.post('/create', isAuth, isAdmin, async (req, res) => {
    const blog = new Blogs({
        title: "Sample Title",
        image: "https://d2uolguxr56s4e.cloudfront.net/img/kartrapages/video_player_placeholder.gif",
        description: "Sample Description",
        price: 200,
        star: 5
    });
    //Save to DB and respond with data (Testing) or errr
    try{
        const savedBlog = await blog.save();
        res.json(savedBlog);
    } catch (err) {
        res.json({ message: err });
    }
});

blogsRouter.put('/:id', isAuth, isAdmin ,upload, async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blogs.findById(blogId);
    if (blog) {
      blog.name = req.body.name;
      blog.price = req.body.price;
      blog.image = req.file.path;
      blog.description = req.body.description;
      const updatedBlog = await blog.save();
      res.send({ message: 'blog Updated', blog: updatedBlog });
    } else {
      res.status(404).send({ message: 'Blog Not Found' });
    }
  });

//Submit a blog
blogsRouter.post('/', isAuth, isAdmin, async (req, res) => {
    const blog = new Blogs({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        star: req.body.star
    });
    //Save to DB and respond with data (Testing) or errr
    try{
        const savedBlog = await blog.save();
        res.json(savedBlog);
    } catch (err) {
            res.json({ message: err });
    }
});

//Update a blog
blogsRouter.patch('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const updatedBlog = await Blogs.updateOne(
            { _id: req.params.id},
            { $set: { title: req.body.title } }
        );
        res.json(updatedBlog);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = blogsRouter;