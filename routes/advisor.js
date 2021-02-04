const router = require('express').Router();
const Post = require('../models/post');
const Student = require('../models/student');
const AcademicNumbers = require('../models/academicNumbers');
const { formatPostsAdvisor } = require('../utils/formatPost');
const { formatStudent } = require('../utils/formatStudent');
const { userDetails } = require('../utils/getUserDetails');
const userType = require('../utils/userType');
const { verifyToken } = require('../utils/tokenController');
const { getValidStudentID } = require('../utils/validIDs');
const {submitAcademicNumbers} = require('../utils/academicNumbers');



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
            // get all students whom advisor is this advisor {advisor}
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

router.get('/contactStudent', async (req, res) => {

    res.status(200).render('advisorPages/advisorContactStudent.hbs', {
        layout: 'advisor',
        pageRole: "Advisor Page",

    });
})

router.get('/registerStudents', async (req, res) => {
    // now should I serve the page 
    // for post I should set another route 

    res.status(200).render('advisorPages/registerStudents.hbs', {
        layout: 'advisor',
        pageRole: "Advisor Page",
    })
})

router.post('/_getStudents',
    verifyToken,
    async (req, res) => {

        const { registeredStudents } = req.body;
        let regArray = registeredStudents.split('\r\n');

        const advisor = await userDetails(res, userType.advisor);

        let validNumbers = getValidStudentID(regArray)[0]['value'];
        let notValidNumbers = getValidStudentID(regArray)[1]['value']; // the array that has wrong format correct numbers
        
        // if the there's no student id in the array then do nothing
        if (validNumbers.length != 0)
            await submitAcademicNumbers(advisor.advisorID, validNumbers);

        // this temporary route for convenate of testing 
        res.redirect('/advisor/')
    })

module.exports = router;