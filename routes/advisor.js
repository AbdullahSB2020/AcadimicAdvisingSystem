const router = require('express').Router();
const Post = require('../models/post');
const formatPosts = require('../utils/formatPost');


router.get('/', async (req, res) => {
    try {
        // get all posts from DB
        await Post.find({}).select('_id title date')
            .then(posts => {

                // send the rendered page with data filled in
                res.status(200).render('studentsProblems.hbs', {
                    layout: 'advisor', 
                    post: formatPosts(posts),
                    addScript: false,
                });

            })
    } catch (err) {
        res.sendStatus(400);
    }
    
})

module.exports = router;