const Cart = require("../Models/CartModel");



 const addToCart= async (req, res) => {
    try {
      const { pizzaId, quantity, price } = req.body;
      const { tempUser } = req;
      if (!tempUser) {
        let { cartId } = req.cookies;
        if (!cartId) {
          const newCart = await Cart.create({
            cartItems: [
              { pizza: pizzaId, quantity, subTotal: quantity * price },
            ],
            totalToPay: quantity * price,
           
          });
          cartId = newCart._id;
          return res
            .cookie("cartId", cartId.toString(), {
              maxAge: 1000 * 60 * 60 * 24 * 7,
            })
            .json({
              message: "Pizza added to cart",
              cart: newCart,
              numberOfCartItems: newCart?.cartItems?.length,
            });
        }
        let cart = await Cart.findOne({ _id: cartId });
        if (!cart) {
          res.cookie("cartId", "PizzaDelivery", {
            maxAge: -1,
          });
          const newCart = await Cart.create({
            cartItems: [
              { pizza: pizzaId, quantity, subTotal: quantity * price },
            ],
            totalToPay: quantity * price,
            
          });
          cartId = newCart._id;
          return res
            .cookie("cartId", cartId.toString(), {
              maxAge: 1000 * 60 * 60 * 24 * 7,
            })
            .json({
              message: "Pizza added to cart",
              cart: newCart,
              numberOfCartItems: newCart?.cartItems?.length,
            });
        }
        const isItemExist = cart.cartItems.find(
          (item) => item.pizza.toString() === pizzaId
        );
        if (isItemExist) {
          cart.cartItems = cart.cartItems.map((item) => {
            if (item.pizza.toString() === pizzaId) {
              item.quantity += quantity;
              item.subTotal += quantity * price;
            }
            return item;
          });
          cart.totalToPay += quantity * price;
          await cart.save();
          return res.json({
            message: "Pizza added to cart",
            cart,
            numberOfCartItems: cart?.cartItems?.length,
          });
        } else {
          cart.cartItems.push({
            pizza: pizzaId,
            quantity,
            subTotal: quantity * price,
          });
          cart.totalToPay += quantity * price;
          await cart.save();
          return res.json({
            message: "Pizza added to cart",
            cart,
            numberOfCartItems: cart?.cartItems?.length,
          });
        }
      } 
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }



  const getCartItems= async (req, res) => {
    try {
      const { tempUser } = req;
      if (tempUser) {
        const cart = await Cart.findOne({
          user: tempUser._id,
          
        })
          .populate({
            path: "cartItems.pizza",
          });
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }
        return res.json(cart);
      }
      let { cartId } = req.cookies;
      if (!cartId) {
        return res.status(404).json({ message: "Cart not found" });
      }
      const cart = await Cart.findOne({ _id: cartId })
        .populate({
          path: "cartItems.pizza",
        });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      return res.json(cart);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }



  const getCartItemsNumber = async (req, res) => {
    try {
      const { tempUser } = req;
      if (tempUser) {
        const cart = await Cart.findOne({
          user: tempUser?._id,
          
        });
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }
        return res.json({
          numberOfCartItems: cart?.cartItems?.length,
        });
      }
      let { cartId } = req.cookies;
      if (!cartId) {
        return res.status(404).json({ message: "Cart not found" });
      }
      const cart = await Cart.findOne({ _id: cartId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      return res.json({
        numberOfCartItems: cart?.cartItems?.length,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  const updateCart= async (req, res) => {
 
      try {
        const { cartId, pizzaId, quantity } = req.body;
        let cart = await Cart.findOne({ _id: cartId })
          .populate({
            path: "cartItems.pizza",
          })
 
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }
        cart.totalToPay = 0;
        
          
    
            cart.cartItems = cart.cartItems.map((item) => {
              if (item.pizza._id.toString() === pizzaId) {
             
                  item.quantity = quantity;
                  item.subTotal = quantity * item.pizza.price;
               
              }
              cart.totalToPay += item.subTotal;
              return item;
            });
            await cart.save();
            return res.json({
              message: "Cart updated",
              cart,
            });
         
          }catch (err) {
        return res.status(500).json({ message: err.message });
      }
    }


   const removeFromCart= async (req, res) => {
      try {
        const { cartId, pizzaId } = req.body;
        let cart = await Cart.findOne({ _id: cartId }).populate({
          path: "cartItems.pizza",
        });
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }
        cart.cartItems = cart.cartItems.filter(
          (item) => item.pizza._id.toString() !== pizzaId
        );
        if (cart.cartItems.length === 0) {
          await Cart.findByIdAndDelete(cart._id);
          return res.json({
            message: "Item removed from cart",
            cart: {},
          });
        }
        await cart.save();
        return res.json({
          message: "Item removed from cart",
          cart,
        });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    }


 module.exports = {addToCart,getCartItems,getCartItemsNumber,updateCart,removeFromCart}