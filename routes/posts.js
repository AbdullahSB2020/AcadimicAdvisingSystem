
const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Student = require('../models/student');
const multer = require('multer');
const path = require('path');
const { verifyToken } = require('../utils/tokenController');



// ------------------------- setting up multer --------------------------

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        let userName = file.originalname.split('.')[0];
        cb(null, `${userName}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

//                \/ for different sizes modify here
const sizeLimit = 1 * 1024 * 1024; // 1MB

const upload = multer({
    storage: storage
});

// ----------------- finished multer set up -----------------------------

// when advisor try to see student info
router.get('/one/:id', async (req, res) => {
    // advisor taking only one post

    let post;

    try {
        post = await Post.findOne({ _id: req.params.id });
    } catch (err) {
        res.sendStatus(400);
    }

    res.render('replytoStudent', {
        layout: 'advisor',
        pageRole: "Advisor Page",
        linktoMain: '/advisor',
        id: req.params.id,
        studentID: post.studentID,
        title: post.title,
        body: post.body,
        attachments: post.attachments != 'No file specified' ? post.attachments : false,
        fallowUp: typeof post.fallowUp !== undefined ? post.fallowUp : "",
    });


})

// post from advisor when he answers student problem
router.post('/fallow', async (req, res) => {

    // update the post with DR answer
    let filter = { _id: req.body.postid };
    let update = { fallowUp: req.body.reply };
    try {

        await Post.findOneAndUpdate(filter, update);

    } catch (err) {
        res.sendStatus(400);
    }
    res.redirect('/advisor');
})

// post for the student to send to his advisor
router.post('/',
    verifyToken,
    upload.single('attachment'),
    async (req, res) => {
        const user = res.locals.user;
        // console.log(user);

        const student = await Student.findById({_id: user._id});

        if(!student){
            console.log("you shouldn't to post a post...");
        }

        // console.log(student.studentID);
        // console.log(student);


        let postBody = {

            studentID: Number(student.studentID),
            studentName: student.username,
            advisorID: student.myAdvisorID,
            title: req.body.title,
            body: req.body.message,
            type: 'private',
            attachment: req.file !== undefined ? req.file.filename : 'No file specified',
        
        }

        const post = new Post({

            studentID: postBody.studentID,
            studentName: postBody.studentName,
            advisorID: postBody.advisorID,
            title: postBody.title,
            body: postBody.body,
            type: postBody.type,
            attachments: postBody.attachment,
            fallowUp: "",

        })
        
        // res.status(200).json({post}); // for test
        try {

            await post.save();
            res.status(200).redirect('/student');

        } catch (err) {
            console.log(err);
            console.log("some error with saving the post happen..");
            res.end('an error with the file');
        }
    })

module.exports = router;