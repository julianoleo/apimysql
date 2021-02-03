const MePoupe = require('../database/MePoupe')
const { validationResult } = require('express-validator')
const tarefaValidation = require('../util/tarefaValidation')

class TaskController {

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

    clientesDelete(request, response) {
        const id = request.params.id
        const query = 'DELETE FROM cliente WHERE cod_cliente = ?'
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
                response.json({ "message": "Cliente Deletado!" })
            }
        })
    }

    deposito(request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else {
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
                    response.json(rows[0])
                } else {
                    response.status(404)
                    response.json({ "message": "Erro interno!" })
                }
            })    
        }
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

    clientesRQ(request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else {
            const id = request.params.id
            if (tarefaValidation.verificaID(id) === 1) {
                const query = 'SELECT * FROM cliente where cod_cliente = ?'
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
            } else {
                response.json({"msg":"o id não é inteiro"})
            }
        }
    }
}

module.exports = new TaskController()