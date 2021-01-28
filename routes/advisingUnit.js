const router = require('express').Router();
const Post = require('../models/post');
const {getAllAdvisors} = require('../utils/getAllAdvisors');


router.get('/', async (req, res) => {

    // send the rendered page with data filled in
    res.status(200).render('advisingUnitPages/advisingUnitMain.hbs', { 
        layout: 'advisingUnit',
        pageRole: "Advising Unit Page",
        
    });

})

router.get('/advisors', async(req, res) => {

    // here we'll fetch the advisors from the list and see who is activiated or not

    const advisors = await getAllAdvisors();

    res.status(200).render('advisingUnitPages/advisingUnitConfirmAdvisors.hbs', { 
        layout: 'advisingUnit',
        pageRole: "Advising Unit Page",
        advisors,
    });
})

router.post('activateAdvisor', async(req,res)=> {
    console.log("route is hit")
    res.status(200).redirect('/advisingUnit/advisors')
})

module.exports = router ;