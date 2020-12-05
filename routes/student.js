const router = require('express').Router();
// const { findOne } = require('../models/post');
const Post = require('../models/post');
const Student = require('../models/student');
const { formatPostsStudent } = require('../utils/formatPost');
const { verifyToken } = require('../utils/tokenController');

router.get('/', verifyToken, async (req, res) => {

    const student = await studentDetails(res);
    
    res.status(200).render('studentPages/studentMain', {
        layout: 'student',
        pageRole: 'Student Page',
        linktoMain: '/student',
        studentName: student.username,
    });
})

router.get('/contact', verifyToken, async (req, res) => {

    res.render('studentPages/studentContactAdvisorForm.hbs', {
        layout: 'student',
        pageRole: 'Student Page',
        linktoMain: '/student',
    });
})

router.get('/myPosts', async (req, res) => {

    try {
        await Post.find({}).select('title fallowUp')
            .then(posts => {
                res.render('studentPages/studentPosts.hbs', {
                    layout: 'student',
                    pageRole: 'Student Page',
                    linktoMain: '/student',
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
                    linktoMain: '/student',
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

async function studentDetails(res) {
    const user = res.locals.user;

    try {
        let student = await Student.findById({ _id: user._id });
        if (student){
             return student;
        } else {
             throw new Error("There is no user with this id...");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = router;