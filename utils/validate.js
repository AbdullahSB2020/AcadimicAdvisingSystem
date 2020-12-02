const { body } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                // write correct filters
                body('username', "you should enter a username"),//.exists({checkFalsy: true}).isString(),
                body('universityid',"not correct id"),//.exists({checkFalsy: true}).matches(/(^\d{9}$)|(^\d{6}$)/),
                body('email', 'email is not valid'),//.exists({checkFalsy: true}).isEmail(),
                body('pass', "email or (password) is not valid").exists({checkFalsy: true}).isAlphanumeric(),
            ];
        }
        case 'signUser': {
            return [
                // write correct filters
                body('username', "username has to be provided").isString().exists(),
                body('email', '(email) or password is not valid').exists().isEmail(),
                body('pass', "email or (password) is not valid").exists().isAlphanumeric(),
            ];
        }
    }
}