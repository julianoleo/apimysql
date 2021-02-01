const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')
const apiController = require('../controllers/apiController')
const tarefaValidation = require('../util/tarefaValidation')

const { body, validationResult } = require('express-validator')

//router.get('/clientes', TaskController.clientes)
//router.get('/clientes/:id', TaskController.clientesID)
//router.delete('/clientes/:id', TaskController.clientesDelete)
//router.post('/deposito', TaskController.deposito)
//router.post('/saque', TaskController.saque)

//Validação

//router.get('/clientes', apiController.verificar)
//router.get('/:id', apiController.verificar, tarefaController.listarPorId)
//router.post('/', apiController.verificar, tarefaController.inserir)
//router.put('/:id', apiController.verificar, tarefaController.alterar)
//router.delete('/:id', apiController.verificar, tarefaController.deletar)

router.get('/login', apiController.login)
router.get('/clientes/:id', apiController.verificar, TaskController.clientesRQ)


module.exports = router