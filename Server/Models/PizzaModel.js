const mongoose = require("mongoose");
const PizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Pizza Name",
    },
    description: {
      type: String,
      required: true,
      default: "Pizza Description",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: mongoose.Schema.Types.Mixed,
      
    },
  },
 
);

module.exports = mongoose.model("Pizza", PizzaSchema);