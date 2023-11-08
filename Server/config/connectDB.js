const mongoose = require ('mongoose')
require ('dotenv').config()




const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true)
        mongoose.connect(process.env.MONGO_URI) 
        console.log('DB is connected ...')
    }
    catch(error) {
        console.log(error)
        
    }
    }
    module.exports = connectDB;

