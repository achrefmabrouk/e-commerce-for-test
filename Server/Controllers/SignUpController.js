const { validationResult } = require('express-validator')
const SignUp= require ('../Models/SignUpModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require ('dotenv').config()



const Register = async (req,res)=>{
try {
    const Errors = validationResult(req)
    if(!Errors.isEmpty()){
        return res.status(401).json({Errors:Errors.mapped()})
    }
    const {name,email,password}=req.body
    const found = await SignUp.findOne({email})
    if (found){return res.status(402).json({message:'you are already existed '})
    }
    const saltRounds=bcrypt.genSaltSync(10)
    const hashedpassword= await bcrypt.hash(password, saltRounds );
    const newUser= await SignUp.create({name,email,password:hashedpassword})
    res.status(200).json({newUser,msg:'Now , you have an account '})
} catch (error) {
    res.status(500).json({message:error})
}
}

const Login =async (req,res)=>{
    try {
        const Errors = validationResult(req)
    if(!Errors.isEmpty()){
        return res.status(401).json({Errors:Errors.mapped()})
    }
    const {email,password}=req.body
    const isFound = await SignUp.findOne({email})
    if(!isFound){
        return res.status(401).json({message:'You have to signUp before'})
    }
    const isMatch =await bcrypt.compare(password, isFound.password)
    if(!isMatch){
        return res.status(402).json({message:'Wrong password'})
    }
    const token = await jwt.sign({id: isFound._id}, process.env.SECRET, { expiresIn: '15d' })
    res.status(200).json({isFound,token})


    } catch (error) {
        res.status(500).json({message:error})
    }
}

 module.exports={Register,Login}
