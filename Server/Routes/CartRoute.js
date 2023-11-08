const express = require("express");
const {addToCart,getCartItems,getCartItemsNumber,updateCart,removeFromCart} = require("../Controllers/CartController");
const router = express.Router();

router.post("/addToCart",addToCart);
 router.get("/getCartItems", getCartItems);
router.get("/getCartItemsNumber",getCartItemsNumber);
router.put("/updateCart", updateCart);
router.delete("/removeFromCart",removeFromCart);


module.exports = router;