const router = require('express').Router();
const Post = require('../models/post');


router.get('/', async (req, res) => {

    // send the rendered page with data filled in
    res.status(200).render('advisingUnitPages/advisingUnitMain.hbs', { // change
        layout: 'advisingUnit',
        pageRole: "Advising Unit Page",
        linktoMain: '/advisingUnit',
    });

})

module.exports = router ;