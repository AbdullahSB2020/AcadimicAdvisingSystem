const router = require('express').Router();
const { validationResult } = require('express-validator');
const validationMethod = require('../../utils/validate');
const Student = require('../../models/student');
const Advisor = require('../../models/advisor');
const bcrypt = require('bcryptjs');
const userType = require('../../utils/userType');
const { createToken } = require('../../utils/tokenController');


router.post('/register',
    validationMethod.validate('createUser'),
    async (req, res) => {

        // we want to make sure data is valid 
        // to format the errors we can use the formater that comes with the validationResult

        const { errors } = validationResult(req);

        if (errors.length != 0) {
            console.log(errors);
        }

        const { universityID, password } = req.body;
        const isAdvisor = Number(universityID.length) === userType.advisor;
        const isStudent = Number(universityID.length) === userType.student;

        // then we want to make sure there is no user with this email
        //  -> once I have some people I can register them using this method
        try {
            let validUser;
            if (isAdvisor) {
                validUser = await Advisor.findOne({ email: req.body.email });
            } else if (isStudent) {
                validUser = await Student.findOne({ email: req.body.email });
            }

            // check there's no user with this id
            if (validUser != undefined) { // there is user with this email

                // res.status(400).json({ msg: "user already registered..." }) // for postman

                res.status(400).render('signUp', {
                    pageRole: 'main page',
                    enableScriptRigster: false,
                    error: "There already a user with this email..."
                }) // ->> for the pages
                return;
            }

        } catch (err) {
            res.status(404).send(err);
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (isAdvisor) { // he might enter letters, it will be caught in the validation
            console.log('create advisor user and submit him to the DB');
            // User is advisor
            const newAdvisor = new Advisor({
                email: req.body.email,
                password: hashedPassword,
                username: req.body.username,
                advisorID: req.body.universityID,
            });

            try {
                const savedUser = await newAdvisor.save();
                console.log(savedUser);
                // res.status(200).json({ msg: "user is created" }); // for postman
                res.status(200).redirect('/'); //for the page
                return;
            } catch (err) {
                console.log("we had an error at advisor section...")
                res.status(404).send(err);
            }
        }
        console.log(req.body.advisorID);
        if (isStudent) {
            console.log('create student user and submit him to the DB');
            // User is Student
            const newUser = new Student({
                email: req.body.email,
                password: hashedPassword,
                username: req.body.username,
                studentID: req.body.universityID,
                //advisorID is optiaonl and should be deleted, this for text only
                myAdvisorID: req.body.advisorID,
            });
            try {
                const savedUser = await newUser.save();
                console.log(savedUser);
                res.status(200).redirect('/'); // for pages
                // res.status(200).json({ msg: "user is created" }); // for postman
                return;
            } catch (err) {
                res.status(404).send(err);
            }

        }

        res.status(200).redirect('/'); // for pages; say sign in or something
        // res.status(200).json({ msg: "user is created" }); // for postman
    })

router.post('/login',
    validationMethod.validate('signUser'),
    async (req, res) => {

        /** we want to make sure data is valid 
            // we are going to be using the express-validator 
        */
        const { universityID, password } = req.body;

        const { errors } = validationResult(req); // finds errors in req and wraps it with an object(errors)

        if (errors.length != 0) {

            // res.status(400).json({ msg: errors }); // for postman
            res.status(400).render('signIn', {
                pageRole: 'register Page',
                linktoMain: '/',
                errorMessage: "invalid Email Or username"
            }); // for pages
            return;
            // here I should send the errors back to the page if any
        }

        // fetch the user based on his universityID

        const isAdvisor = Number(universityID.length) === userType.advisor;
        const isStudent = Number(universityID.length) === userType.student;

        let user;

        if (isStudent) {
            try {
                user = await Student.findOne({ studentID: universityID });
            } catch (err) {
                console.log("error occured while fetch student user...")
            }
        }

        if (isAdvisor) {
            try {
                user = await Advisor.findOne({ advisorID: universityID });
            } catch (err) {
                console.log("error occured while fetch advisor user...")
            }
        }

        // if no user found

        const userIsNull = (user === null);
        const userIsUndef = (user === undefined);

        if (userIsNull | userIsUndef) {
            console.log("There's no user with this id...!")
            // res.status(400).json({ msg: "There's already a user with this id" }); // for postman
            res.status(400).render('signIn', {
                pageRole: 'main page',
                enableScriptRigster: false,
                error: "enter valid entries, please",
            }) // for pages
            return;
        }

        // then compare password with DB user.password
        if (user !== undefined) {

            const comparedPass = await bcrypt.compare(password, user.password);

            if (comparedPass) {

                if (isStudent) {
                    // create a jwt for this user.. ((possibly I need to create a function to do that ))
                    createToken(user._id, req, res);
                    
                    res.status(200).redirect('/student'); // for pages
                    // res.status(200).json({ msg: `${user.username} is student, has matched password` }); // for postman
                    return;
                }

                if (isAdvisor) {
                    createToken(user._id, req, res);

                    res.status(200).redirect('/advisor'); // for pages
                    // res.status(200).json({ msg: `${user.username} is advisor, has matched password` }); // for postman
                    return;
                }
            }
        }
        res.status(400).redirect('/'); // for pages
        // res.status(400).json({ msg: "You are screwed..." });
    })

module.exports = router;