const Order = require("../Models/OrderModel");
const User = require("../Models/SignUpModel");
const Cart = require("../Models/CartModel");
const Address = require("../Models/AddressModel");


 const addOrder= async (req, res) => {
    try {
      const {
        user,
        streetAddress,
        city,
        state,
        email,
        phoneNumber,
      
      } = req.body;
      let existingUser = await User.findById(user);
      if (!existingUser) {
        return res.status(400).json({ error: "User does not exist!" });
      }
      let cart = await Cart.findOne({ user: user});
      if (!cart) {
        return res.status(400).json({ error: "Cart does not exist!" });
      }
      const addresses = await Address.find({
        user: user,
      });
      if (addresses && addresses?.length > 0) {
        const existingAddress = addresses.find((address) => {
          return (
            address.user === user &&
            address.streetAddress === streetAddress &&
            address.city === city &&
            address.state === state &&
            address.email === email &&
            address.phoneNumber === phoneNumber
          );
        });
        
          
         
          if (!order) {
            return res
              .status(400)
              .json({ error: "Order could not be created!" });
          }
          const order = await Order.create({
            user,
            cart,
            address,
          });
          await cart.save();
          return res.status(201).json({
            order,
            message: "Order created successfully!",
          });
        } 
      
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
}



  module.exports={addOrder}