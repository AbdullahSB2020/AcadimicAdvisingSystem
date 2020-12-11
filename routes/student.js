const router = require('express').Router();
// const { findOne } = require('../models/post');
const Post = require('../models/post');
const Student = require('../models/student');
const { formatPostsStudent } = require('../utils/formatPost');
const { userDetails } = require('../utils/getUserDetails');
const { verifyToken } = require('../utils/tokenController');
const userType = require('../utils/userType');

router.get('/', verifyToken, async (req, res) => {

    const student = await userDetails(res,userType.student);
    
    res.status(200).render('studentPages/studentMain', {
        layout: 'student',
        pageRole: 'Student Page',
        studentName: student.username,
    });
})

router.get('/contact', verifyToken, async (req, res) => {

    res.render('studentPages/studentContactAdvisorForm.hbs', {
        layout: 'student',
        pageRole: 'Student Page',
    });
})

router.get('/myPosts', verifyToken, async (req, res) => {

    const student = await userDetails(res,userType.student);

    try {
        // get the post for this student only
        await Post.find({studentID: student.studentID}).select('title fallowUp')
            .then(posts => {
                res.render('studentPages/studentPosts.hbs', {
                    layout: 'student',
                    pageRole: 'Student Page',
                    post: formatPostsStudent(posts),
                });
            })
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/myPost/:id', async (req, res) => {

    try {
        await Post.findOne({ _id: req.params.id })
            .then(post => {
                res.render('studentPages/studentPost', {
                    layout: 'student',
                    pageRole: 'Stduent Page',
                    title: post.title,
                    body: post.body,
                    fallowUp: post.fallowUp,
                    attachment: post.attachment,
                })
            })
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})

router.get('/myFile', verifyToken, async (req, res) => {

    const student = await userDetails(res,userType.student);

    res.render('studentPages/studentFile.hbs', {
        layout: 'student',
        pageRole: 'Student Page',
        studentName: student.username,
        email: student.email,
        universityID: student.studentID,
    });
})

module.exports = router;