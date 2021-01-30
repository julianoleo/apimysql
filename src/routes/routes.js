const connection = require('../database/conections')
const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

router.post('/novaTarefa', TaskController.novaTarefa)
router.get('/clientes', TaskController.clientes)
router.get('/clientes/:id', TaskController.clientesID)
router.post('/transferencia', TaskController.tranferencia)

module.exports = router