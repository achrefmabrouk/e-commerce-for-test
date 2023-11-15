const express = require('express')
const  connectDB  = require('./config/connectDB')
require ('dotenv').config()
const SignUpRoute = require ('./Routes/SignUpRoute')
const PizzaRoute = require ('./Routes/PizzaRoute')
const CartRoute = require ('./Routes/CartRoute')
const cookieParser = require('cookie-parser')
const orderRoute=require('./Routes/OrderRoute')
const fileUpload = require('express-fileupload')


const app = express()
connectDB()


app.use(fileUpload({
    useTempFiles : true,
    
}));





app.use(express.json())
app.use(cookieParser());
app.use('/api/signUp',SignUpRoute)
app.use('/api/pizza', PizzaRoute )
app.use('/api/cart', CartRoute )
app.use('/api/order', orderRoute)


Port = process.env.PORT || 7000
app.listen(Port,err=>err?console.log(err):console.log('server is running...'))
