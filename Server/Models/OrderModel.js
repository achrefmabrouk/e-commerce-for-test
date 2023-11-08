const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SignUp",
      required: true,
    },

    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    
    quantity: { type: Number, default: 0 },
    totalToPay: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    
  },

);

module.exports = mongoose.model("Order", OrderSchema);