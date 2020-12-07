const router = require('express').Router();
const Post = require('../models/post');
const { formatPostsAdvisor } = require('../utils/formatPost');
const { userDetails } = require('../utils/getUserDetails');
const userType = require('../utils/userType');
const { verifyToken } = require('../utils/tokenController');



router.get('/', verifyToken, async (req, res) => {

    // send the rendered page with data filled in
    res.status(200).render('advisorPages/advisorMain.hbs', {
        layout: 'advisor',
        pageRole: "Advisor Page",
    });

})

router.get('/contactRequests',
    verifyToken,
    async (req, res) => {
        
        // get advisor info from DB
        const advisor = await userDetails(res, userType.advisor);

        try {
            // get all posts from DB with the advisor id on it
            await Post.find({advisorID: advisor.advisorID}).select('_id title date studentName')
                .then(posts => {

                    // send the rendered page with data filled in
                    res.status(200).render('advisorPages/advisorGetStudentsProblems.hbs', {
                        layout: 'advisor',
                        pageRole: "Advisor Page",
                        post: formatPostsAdvisor(posts),
                        addScript: false,
                    });
                })
        } catch (err) {
            res.sendStatus(400);
        }

    })

module.exports = router;