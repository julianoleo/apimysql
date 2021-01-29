const connection = require('../database/conections')
const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

router.post('/novaTarefa', TaskController.novaTarefa) //end point

module.exports = router