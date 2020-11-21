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

// advisor taking all posts made by students
router.get('/', async (req, res) => {
    try {
        await Post.find({}).select('_id title date')
        .then(posts => {

            console.log(posts);
            // res.end();

            res.status(200).json(posts)
        })
    } catch (err) {
        res.sendStatus(400);
    }
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
        console.log(' \n saved post is');
        console.log(savedPost);
        res.status(200).redirect('../student.html'); // there should be some other routing methods here..!

    } catch (err) {
        console.log(err);
        console.log("some error with saving the post happen..");
        res.end('an error with the file');
    }
    res.redirect('../student.html');
})

module.exports = router;