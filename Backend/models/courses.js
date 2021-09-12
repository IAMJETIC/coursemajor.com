const mongoose = require('mongoose');

const CoursesSchema = mongoose.Schema({
    imageKey: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    star: {
        type: Number,
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectID, 
        ref: 'User' 
    }
});

module.exports = mongoose.model('Courses', CoursesSchema);