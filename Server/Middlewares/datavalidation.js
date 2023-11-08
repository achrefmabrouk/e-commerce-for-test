const {body}=require ('express-validator')

exports.datavalidation= [body('email','Please enter a valid Email').isEmail(),
body('password','The password should be at least 7 characters').isLength({min:7})]