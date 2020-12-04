const { body } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                // write correct filters
                body('username', "you should enter a username").exists({checkFalsy: true}).bail()
                    .isString(),
                body('universityID',"not correct id").exists({checkFalsy: true}).bail()
                    .matches(/(^\d{9}$)|(^\d{6}$)/),
                body('email', 'email is not valid').exists({checkFalsy: true}).bail()
                    .isEmail(),
                body('password', "email or (password) is not valid").exists({checkFalsy: true}).bail()
                    .isAlphanumeric().withMessage("password has to be alpha numieric"),
            ];
        }
        case 'signUser': {
            return [
                // write correct filters
                body('universityID',"you must fill the id").exists({checkFalsy: true}).bail()
                    .matches(/(^\d{9}$)|(^\d{6}$)/).withMessage("not correct fromat"),

                body('password', "password is not valid").exists({checkFalsy: true}).bail()
                    .isAlphanumeric(),
            ];
        }
    }
}