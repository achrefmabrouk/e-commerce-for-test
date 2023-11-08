const express= require('express')
const router = express.Router()
const SignUpController = require ('../Controllers/SignUpController')
//const  datavalidation   = require('../Middlewares/datavalidation ')
const {body}=require ('express-validator')



router.post('/Register',body('email','Please enter a valid Email').isEmail(),body('password','The password should be at least 7 characters').isLength({min:7}),  SignUpController.Register)
 router.post('/Login',body('email','Please enter a valid Email').isEmail(),body('password','The password should be at least 7 characters').isLength({min:7}),SignUpController.Login
) 


module.exports=router