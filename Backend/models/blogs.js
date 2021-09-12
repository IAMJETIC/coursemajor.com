const mongoose = require('mongoose');

const BlogsSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('Blogs', BlogsSchema);