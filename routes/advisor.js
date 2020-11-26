const router = require('express').Router();
const Post = require('../models/post');
const { formatPostsAdvisor } = require('../utils/formatPost');


router.get('/', async (req, res) => {

    // send the rendered page with data filled in
    res.status(200).render('advisorPages/advisorMain.hbs', {
        layout: 'advisor',
        pageRole: "Advisor Page",
        linktoMain: '/advisor',
    });

})

router.get('/contactRequests', async (req, res) => {

    try {
        // get all posts from DB
        await Post.find({}).select('_id title date')
            .then(posts => {

                // send the rendered page with data filled in
                res.status(200).render('advisorPages/advisorGetStudentsProblems.hbs', {
                    layout: 'advisor',
                    pageRole: "Advisor Page",
                    linktoMain: '/advisor',
                    post: formatPostsAdvisor(posts),
                    addScript: false,
                });
            })
    } catch (err) {
        res.sendStatus(400);
    }

})

module.exports = router;