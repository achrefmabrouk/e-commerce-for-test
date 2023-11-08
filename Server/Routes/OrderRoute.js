const express = require("express");
const {addOrder} = require("../Controllers/OrderController");
const router = express.Router();

router.post('/add',addOrder);

module.exports = router;