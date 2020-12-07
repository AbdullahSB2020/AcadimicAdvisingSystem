const userType = require('./userType');
const Student = require('../models/student');
const Advisor = require('../models/advisor');

/**
 * get information from DB based on user id and return user object 
 * 
 * @param {Object} response response body to get res.locals.user which is user id
 * @param {Number} userRole select the user if he is student or advisor
 */
async function userDetails(response, userRole) {
    const user = response.locals.user;
   
    switch (userRole) {
        case (userType.student):{ 
            try {
                const student = await Student.findById({ _id: user._id });
                if (student) {
                    return student;
                } else {
                    throw new Error("There is no user with this id...");
                }
            } catch (err) {
                console.log(err);
            }
        }
        case (userType.advisor):{
            try {
                const advisor = await Advisor.findById({_id: user._id});

                if(advisor){
                    return advisor;
                } else {
                    throw new Error("There is no user with this id..");
                }

            } catch (err) {
            }
        }
    }
}

module.exports = {
    userDetails,
}