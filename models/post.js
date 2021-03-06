const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    studentID:{
        type: Number,
        required: true,
        max: 999999999,
        min: 100000000,
    },
    studentName: {
        type: String,
    },
    advisorID:{
        type: Number,
        required: true,
    },
    title: String,
    body: String,
    type: { // < taken from the drop list in the chosing subject ( private or public)
        type: String
    }, 
    date: {
        type: Date,
        default: Date.now()
    },
    attachments: String,
    fallowUp: String, // try to make like this { type: String, default: ""} no reply when initlize the post
});

const Post = mongoose.model('post', postSchema);

module.exports = Post ;