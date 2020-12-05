const jwt = require('jsonwebtoken');

createToken = (id,req,res) => { // for the request you are passing it by reference 
    const token = jwt.sign({_id: id},process.env.TOKEN_SECRET);
    
    // add token to the Bearer
    const tokenBearer =  `Bearer ${token}`;
    
    // set the token
    res.cookie('token',tokenBearer,{httpOnly: true});

}

verifyToken = (req,res,next) => {
    // get the token from the request
    const tokenWithBearer = req.cookies.token ;
    
    // this condition if no token is present in the request
    if(!tokenWithBearer){
        // return res.status(401).json({msg: "There is no token to be verified..."}); // for postman
        return res.status(401).redirect('/'); // for pages
    }

    // split the token from the word Bearer
    // Bearer format : Bearer <token>
    const token = tokenWithBearer.split(' ')[1];
        
    const theUser = jwt.verify(token,process.env.TOKEN_SECRET);

    /**
     * whenever a method use this verifyToken() it will have access to res.locals.user
     * which is the user object
    */
    res.locals.user = theUser ;

    // call next middle-ware
    next();
}


module.exports = {
    createToken,
    verifyToken,
}