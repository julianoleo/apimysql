const { request } = require('express')
const database = require('../database/conections')
const MePoupe = require('../database/MePoupe')

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

    clientes(request, response) {
        const query = 'SELECT * FROM cliente'
        MePoupe.query(query, request, (err, rows) => {
            if (err) {
                console.log(err)
                response.status(500)
                response.json({ "message": "Internal Server Error" })
            } else if (rows.length > 0) {
                response.status(200)
                response.json(rows)
            } else {
                response.status(404)
                response.json({ "message": "Nenhuma tarefa cadastrada para esta busca" })
            }
        })
    }

    clientesID(request, response) {
        const id = request.params.id
        const query = 'SELECT * FROM cliente WHERE cod_cliente = ?'
        MePoupe.query(query, [id], (err, rows) => {
            if (err) {
                console.log(err)
                response.status(500)
                response.json({ "message": "Internal Server Error" })
            } else if (rows.length > 0) {
                response.status(200)
                response.json(rows)
            } else {
                response.status(404)
                response.json({ "message": "Cliente não encontrado!" })
            }
        })
    }

    deposito(request, response) {
        const tarefa = {}
        tarefa.conta = request.body.conta
        tarefa.valor = request.body.valor
        const query = 'call deposito(?, ?)'

        MePoupe.query(query, [tarefa.conta, tarefa.valor], (err, rows) => {
            if (err) {
                console.log(err)
                response.status(500)
                response.json({ "message": "Internal Server Error" })
            } else if (rows.length > 0) {
                response.status(200)
                response.json(rows)
            } else {
                response.status(404)
                response.json({ "message": "Erro interno!" })
            }
        })
    }

    saque(request, response) {
        const tarefa = {}
        tarefa.conta = request.body.conta
        tarefa.valor = request.body.valor
        const query = 'call saque(?, ?)'

        MePoupe.query(query, [tarefa.conta, tarefa.valor], (err, rows) => {
            if (err) {
                console.log(err)
                response.status(500)
                response.json({ "message": "Internal Server Error" })
            } else if (rows.length > 0) {
                response.status(200)
                response.json(rows)
            } else {
                response.status(404)
                response.json({ "message": "Erro interno!" })
            }
        })
    }
}

module.exports = new TaskController()