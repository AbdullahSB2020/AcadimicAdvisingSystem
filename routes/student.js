const router = require('express').Router();
const Post = require('../models/post');
const { formatPostsStudent } = require('../utils/formatPost');



router.get('/', (req, res) => {
    res.status(200).render('studentPages/studentMain', {
        layout: 'student',
        pageRole: 'Student Page',
        linktoMain: '/student',
    });
})

router.get('/contact', async (req, res) => {

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
router.get('/myPost/:id', async (req,res)=> {

    try{
        await Post.findOne({_id: req.params.id})
        .then(post => {
            res.render('studentPages/studentPost',{
                layout: 'student',
                pageRole: 'Stduent Page',
                title: post.title ,
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

module.exports = router;