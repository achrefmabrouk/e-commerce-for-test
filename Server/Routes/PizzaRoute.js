const express = require('express');
const { UpdatePizza,DeletePizza,GetAllPizza,AddPizza } = require('../Controllers/PizzaController');
const router = express.Router()
const pizza = require('../Models/PizzaModel')


router.post('/', AddPizza)

router.get('/', GetAllPizza )

router.delete('/:id',DeletePizza )

router.put('/:id', UpdatePizza )

module.exports = router
