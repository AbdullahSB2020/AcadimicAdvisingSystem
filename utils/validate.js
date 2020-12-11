const { body } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                body('username', "you should enter a username").exists({checkFalsy: true}).bail()
                    .isString(),
                
                body('universityID',"you should spicify an id").exists({checkFalsy: true}).bail()
                    .matches(/(^\d{9}$)|(^\d{6}$)/).withMessage('id not correct format'),
                
                // optional, should be deleted
                body('advisorID',"you should spicify an id").matches(/(^\d{6}$)/),
                
                body('email', 'you should spicify an email').exists({checkFalsy: true}).bail()
                    .isEmail().withMessage("email have to be Alphanumbric"),
                
                body('password', "you should spicify an a password").exists({checkFalsy: true}).bail()
                    .isAlphanumeric().withMessage("password has to be alphanumieric"),
            ];
        }
        case 'signUser': {
            return [
                body('universityID',"you must fill the id").exists({checkFalsy: true}).bail()
                    .matches(/(^\d{9}$)|(^\d{6}$)/).withMessage("not correct fromat"),

                body('password', "you should spicify an email").exists({checkFalsy: true}).bail()
                    .isAlphanumeric().withMessage("email have to be Alphanumbric"),
            ];
        }
    }
}