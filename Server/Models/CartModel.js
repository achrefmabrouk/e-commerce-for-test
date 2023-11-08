const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SignUp",
      default: null,
    },
    cartItems: [
      {
        type: {
          pizza: { type: mongoose.Schema.Types.ObjectId, ref: "Pizza" },
          quantity: { type: Number, default: 1 },
          subTotal: { type: Number, default: 0 },
        },
        default: [],
      },
    ],
    shipping: { type: Number, default: 6 },
    totalToPay: { type: Number, default: 0 },
   },
);

module.exports = mongoose.model("Cart", CartSchema);