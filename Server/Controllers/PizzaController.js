const pizza = require('../Models/PizzaModel')




const AddPizza =  async(req,res)=>{
    try {
        
        const newPizza = await pizza.create(req.body)
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