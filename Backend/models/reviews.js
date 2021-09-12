const mongoose = require('mongoose');

const ReviewsSchema = mongoose.Schema({
    image: {
        type: String,
        //required: true
    },
    title: {
        type: String,
        //required: true
    },
    description: {
        type: String,
        //required: true
    },
    price: {
        type: Number,
        //required: true
    },
    published: {
        type: Boolean,
        //required: true,
        default: false
    },
    star: {
        type: Number,
        //required: true
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectID, 
        ref: 'User' 
    }
});

module.exports = mongoose.model('Reviews', ReviewsSchema);