const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')
const apiController = require('../controllers/apiController')

const { body, validationResult } = require('express-validator')

// Rotas de autenticação
router.get('/login', apiController.login)
router.get('/logoff', apiController.logoff)

//Rotas com Validação
router.get('/clientes/:id', apiController.verificar, TaskController.clientesRQ)
router.post('/deposito', apiController.verificar, TaskController.deposito)

//Rotas sem Validação

//router.get('/clientes', TaskController.clientes)
//router.get('/clientes/:id', TaskController.clientesID)
//router.delete('/clientes/:id', TaskController.clientesDelete)
//router.post('/deposito', TaskController.deposito)
//router.post('/saque', TaskController.saque)

module.exports = router