const router = require('express').Router();
const Post = require('../models/post');
const {formatPostsStudent} = require('../utils/formatPost');



router.get('/',(req,res)=> {
    res.status(200).render('studentMain',{
        layout: 'student',
    });
})

router.get('/contact', async (req, res) => {

    res.render('studentContactAdvisorForm.hbs',{
        layout:'student',
        pageRole: 'Student Page',
    });
})

router.get('/myPosts',async (req, res)=> {
    
    // let post;
    try{
         await Post.find({}).select('title fallowUp')
        .then(posts => {
            // console.log(posts);
            res.render('studentPosts.hbs',{
                layout:'student',
                pageRole: 'Student Page',
                post: formatPostsStudent(posts),
            });

        })
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
    // res.end();
})

module.exports = router;