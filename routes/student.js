const router = require('express').Router();

router.get('/', async (req, res) => {
    console.log(req.path)

    res.render('test.hbs',{
        layout:'student',
        pageRole:'Student Page'
    });
})

module.exports = router ;