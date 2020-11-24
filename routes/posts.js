const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');
const path = require('path');


// ------------------------- setting up multer --------------------------

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        let userName = file.originalname.split('.')[0];
        cb(null, `${userName}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

//               \/ for different sizes modify here
const sizeLimit = 1 * 1024 * 1024; // 1MB

const upload = multer({
    storage: storage
});

// ----------------- finished multer set up -----------------------------


router.get('/one/:id', async (req, res) => {
    // advisor taking only one post
    // console.log(req.params.id);
    let post;
    try {
         post = await Post.findOne({_id: req.params.id});
    } catch (err) {
        res.sendStatus(400);
    }
    // console.log(post);
    // res.end();
    res.render('replaytoStudent',{
        layout: 'advisor',        
        studentID: post.studentID,
        title: post.title,
        body: post.body,
        attachments: post.attachments != 'No file specified' ? post.attachments : false ,
    });
})

// post for the student to send to his advisor
router.post('/', upload.single('attachment'), async (req, res) => {

    let postBody = {
        studentID: Number(req.body.student_id),
        title: req.body.title,
        body: req.body.message,
        type: 'private',
        attachment: req.file !== undefined ? req.file.filename : 'No file specified',
    }

    const post = new Post({
        studentID: postBody.studentID,
        title: postBody.title,
        body: postBody.body,
        type: postBody.type,
        attachments: postBody.attachment
    })

    try {

        const savedPost = await post.save();
        res.status(200).redirect('../student.html'); // there should be some other routing methods here..!

    } catch (err) {
        console.log(err);
        console.log("some error with saving the post happen..");
        res.end('an error with the file');
    }
    // res.redirect('../student.html');
})

module.exports = router;