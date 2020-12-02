const router = require('express').Router();
const { validationResult } = require('express-validator');
const validationMethod = require('../../utils/validate');
const Student = require('../../models/student');
const bcrypt = require('bcryptjs');

// console.log(validate.validate('createUser'));

router.post('/register',
    validationMethod.validate('createUser'),
    async (req, res) => {

        const {errors} = validationResult(req);

        if(errors.length != 0) {
            // console.log(`length of id is ${req.body.universityid.length}, has 2 B 6 | 9`);
            // console.log(`username is ${req.body.username} has error`);
            console.log(`email is ${req.body.email} has error`);
            console.log(errors);
        }
        console.log('\n----------------------------------\n')
        /** we want to make sure data is valid 
            // we are going to be using the express-validator 
        */

        // then we want to make sure there is no user with this email


        // then for the password we gonna hash it


        // then we gonna dump it in the DB

        res.status(200).redirect('/');

    })

router.post('/login',
    validationMethod.validate('signUser'),
    async (req, res) => {

        /** we want to make sure data is valid 
            // we are going to be using the express-validator 
        */
        let advisorCheck = /^\d{6}$/m;
        let studentCheck = /^\d{9}$/m;

        const { errors } = validationResult(req); // finds errors in req and wraps it with an object(errors)

        let emailWithID = req.body.email;
        let theid = emailWithID.split('@')[0];
        let studentID = emailWithID.split('@')[0];

        let s = studentCheck.test(theid);
        let a = advisorCheck.test(theid);
        // console.log(a, s);

        if (a) {
            console.log('\t\t Hello Mr.Advisor\n');
        }
        if (s) {
            console.log('\t\t Hello Student\n');
        }

        if (!s && !a) {
            console.log("\t\t what the hell are you doing in here...!\n");
            return res.end();
        }

        if (errors.length != 0) {
            // console.log(errors);
            // const err = errors.filter(error => error.msg ==="Invalid value" ).map(error => [error.msg, error.param]);
            // console.log(err);
            console.log("we are in the if condition...")
            return res.status(400).render('register', {
                pageRole: 'register Page',
                linktoMain: '/',
                errorMessage: "invalid Value With Email Or username"
            });
            // here I should send the errors back to the page if any
        }

        // then we want to make sure there is no user with this email


        // then for the password we gonna hash it

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.pass, salt);


        // then we gonna dump it in the DB
        console.log(req.body);
        const newUser = new Student({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
            studentID: studentID,
        });

        console.log(newUser);

        try {
            // const savedUser = await newUser.save();
            console.log('\twe have reached here... [try]');
            // console.log(savedUser);
            res.status(200).redirect('/student');
        } catch (err) {
            res.sendStatus(404);
        }

        // res.render('register', {
        //     pageRole: 'register Page',
        //     linktoMain: '/',
        // });
    })

module.exports = router;