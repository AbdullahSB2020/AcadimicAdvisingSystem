const router = require('express').Router();

router.get('/', (req, res) => {
    
    /**
     * this path will be shown when you are on the student page or advisor page.
     * so there's no need for else clause
     */
   if(req.cookies.token){
    //    res.clearCookie('token').status(200).json({msg: "token is removed."}); // for post man
    res.clearCookie('token').status(200).redirect('/'); // on the real path for pages

   } 
   else {
     res.status(200).redirect('/');
   }
//    else {
//        res.status(400).json({msg: "there is no token to remove..."}) // for postman for checking purposes
//    }

});

module.exports = router;