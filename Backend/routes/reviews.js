const express = require('express');
const reviewsRouter = express.Router();

const Reviews = require('../models/reviews');
const Order = require('../models/orderModel');

const multer = require('multer');
const path = require('path');
const { isAuth } = require('../utils/utils.js');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    },
})
 
const upload = multer({ storage: storage }).single("Thumbnail")

//Return all reviews
reviewsRouter.get('/', async (req, res) => {
    try {
        const reviews = await Reviews.find();
        res.json(reviews);
    } catch (err) {
        res.json({ message: err });
    }
});


//Return buyers purchase reviews
reviewsRouter.get('/purchased',
isAuth,
async (req, res) => {
    try {
        const Orders = await Order.find({ user: req.user._id });
        
        let reviewId=[];
        Orders.forEach(item => { 
            reviewId.push({_id: item.orderItems[0].review});
        });

        const orderedReviews= await Reviews.find({$or: reviewId});
        res.json(orderedReviews);

        //Reviews.find({$or: [{major: "chemistry"}, {name: "Jack"}]})
    } catch (err) {
        res.json({ message: err });
    }
});

//Return specific review
reviewsRouter.get('/:id', async (req, res) => {
    try {
        const reviews = await Reviews.findById(req.params.id);
        res.json(reviews);
    } catch (err) {
        res.json({ message: err });
    }
});

reviewsRouter.delete('/:id', isAuth, async (req, res) => {
    try {
        const removedReview = await Reviews.remove({_id: req.params.id});
        res.json(removedReview);
    } catch (err) {
        res.json({ message: err });
    }
});

reviewsRouter.post('/create', 
isAuth, 
async (req, res) => {
    const review = new Reviews({
        title: "Sample Title",
        image: "https://d2uolguxr56s4e.cloudfront.net/img/kartrapages/video_player_placeholder.gif",
        description: "Sample Description",
        price: 200,
        star: 5,
        //seller: req.user._id
    });
    //Save to DB and respond with data (Testing) or errr
    try{
        const savedReview = await review.save();
        res.json(savedReview);
    } catch (err) {
        res.json({ message: err });
    }
});

reviewsRouter.put('/:id', isAuth, upload, async (req, res) => {
    const reviewId = req.params.id;
    const review = await Reviews.findById(reviewId);
    if (review) {
      review.title = req.body.name;
      review.price = parseInt(req.body.price);
      review.image = `uploads/${req.file.filename}`
      review.description = req.body.description;
      const updatedReview = await review.save();
      res.send({ message: 'review Updated', review: updatedReview });
    } else {
      //res.status(404).send({ message: 'Review Not Found' });
    }
  });

//Submit a review
reviewsRouter.post('/', isAuth, async (req, res) => {
    const review = new Reviews({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        star: req.body.star
    });
    //Save to DB and respond with data (Testing) or errr
    try{
        const savedReview = await review.save();
        res.json(savedReview);
    } catch (err) {
            res.json({ message: err });
    }
});

//Update a review
reviewsRouter.patch('/:id', isAuth, async (req, res) => {
    try {
        const updatedReview = await Reviews.updateOne(
            { _id: req.params.id},
            { $set: { title: req.body.title } }
        );
        res.json(updatedReview);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = reviewsRouter;