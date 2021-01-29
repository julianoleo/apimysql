const { request } = require('express')
const database = require('../database/conections')

class TaskController {
    novaTarefa(request, response) {
        const { nome, cpf, rg } = request.body
        console.log(nome, cpf, rg)
        database.insert({ nome, cpf, rg }).table("dbClientes").then(data => {
            console.log(data)
            response.json({ message: "Dados inseridos com Sucesso!" })
        }).catch(error => {
            console.log(error)
        })
    }
}

module.exports = new TaskController()