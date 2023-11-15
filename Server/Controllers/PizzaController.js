const pizza = require('../Models/PizzaModel');
const cloudinary = require('../config/cloudinary');




const AddPizza =  async(req,res)=>{
    try {

        const {name,description,price}=req.body;
        const Img = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        
         const newPizza = await pizza.create({name,description,price,image:{image_url:Img.url,image_id:Img.public_id}})

        res.json({newPizza, msg:'Pizza Added Successfully'}) 

      
    } catch (error) {
        console.log(error)
    }
}

const GetAllPizza = async(req,res)=>{
    try {
        const pizzas = await pizza.find({})
        res.json(pizzas)
    } catch (error) {
        console.log(error);
    }
}


const DeletePizza = async(req,res)=>{
    try {
        const deletedpizza = await pizza.findByIdAndDelete(req.params.id)
        res.json({msg:'Pizza has been deleted successfully !!',deletedpizza})
    } catch (error) {
        console.log(error)
    }
}


const UpdatePizza = async(req,res)=>{
    try {
        const updatedpizza = await pizza.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(updatedpizza)
    } catch (error) {
        console.log(error)
    }
}



module.exports = {UpdatePizza,DeletePizza,GetAllPizza,AddPizza}