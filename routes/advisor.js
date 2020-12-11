const router = require('express').Router();
const Post = require('../models/post');
const Student = require('../models/student');
const { formatPostsAdvisor } = require('../utils/formatPost');
const { formatStudent } = require('../utils/formatStudent');
const { userDetails } = require('../utils/getUserDetails');
const userType = require('../utils/userType');
const { verifyToken } = require('../utils/tokenController');



router.get('/', verifyToken, async (req, res) => {

    const advisor = await userDetails(res, userType.advisor);

    // send the rendered page with data filled in
    res.status(200).render('advisorPages/advisorMain.hbs', {
        layout: 'advisor',
        pageRole: "Advisor Page",
        advisorName: advisor.username,
    });

})

router.get('/contactRequests',
    verifyToken,
    async (req, res) => {

        // get advisor info from DB
        const advisor = await userDetails(res, userType.advisor);

        try {
            // get all posts from DB with the advisor id on it
            await Post.find({ advisorID: advisor.advisorID }).select('_id title date studentName')
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

router.get('/advisorStudents',
    verifyToken,
    async (req, res) => {

        // get advisor info from DB
        const advisor = await userDetails(res, userType.advisor);

        try {
            await Student.find({ myAdvisorID: advisor.advisorID })
                .then(AdvisorStudents => {

                    res.status(200).render('advisorPages/advisorStudents.hbs', {
                        layout: 'advisor',
                        pageRole: "Advisor Page",
                        student: formatStudent(AdvisorStudents),
                    })
                })

        } catch (err) {
            console.log(err)
        }


    })

module.exports = router;