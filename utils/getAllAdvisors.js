const uuid = require('uuid');

const Advisor = require('../models/advisor');

/**
 * get all advisors from the DB 
 * 
 * used in page /advisingUnit/advisors
 */
async function getAllAdvisors(){
    try{

        const advisors = await Advisor.find();
        if(!advisors) console.log("There are no advisors..");

        return formatAdvisor(advisors);
            

    } catch(err){
        console.log(err);
    }
}

function formatAdvisor(advisors){
    let advisorsArray = [];
    advisors.map(advisor => {

        let obj = {
            activeAdvisor: advisor.activeAdvisor,
            email: advisor.email,
            username: advisor.username,
            advisorID: advisor.advisorID,
            boxID : uuid.v4(), // used in adding unique key to each toggle element in the dom
        }
        advisorsArray.push(obj);
    })
    return advisorsArray
}
module.exports = {
    getAllAdvisors,
}