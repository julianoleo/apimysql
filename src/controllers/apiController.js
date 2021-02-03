const MePoupe = require('../database/MePoupe')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class apiController {

    login(req, res) {

        const email = req.body.email
        const senha = req.body.senha
        const query = 'select id, senha from usuarios where binary email = ?'

        MePoupe.query(query, [email], (err, rows) => {
            if (err) {
                console.log(err)
                res.status(500)
                res.json({
                    auth: false,
                    "message": "Internal Server Error"
                })
            } else if (rows.length > 0) {
                if (senha === rows[0].senha) {
                    const usuario = rows[0].id
                    jwt.sign({ usuario }, process.env.SECRET, { expiresIn: 30 }, (err, token) => {
                        res.status(200)
                        res.json({
                            auth: true,
                            token: token
                        })
                    })
                } else {
                    res.status(403)
                    res.json({
                        auth: false,
                        message: "E-mail e/ou senhas incorreto(s)"
                    })
                }
            } else {
                res.status(403)
                res.json({
                    auth: false,
                    message: "E-mail e/ou senhas incorreto(s)"
                })
            }
        })
    }

    verificar(req, res, next) {

        const token = req.headers['token']
        if (!token) {
            res.status(401)
            res.send({
                auth: false,
                message: 'O token está em branco'
            })
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(500)
                res.send({
                    auth: false,
                    message: 'Falha de autenticação'
                })
            } else {
                next()
            }
        })
    }

    logoff(req, res) {
        res.status(200)
        console.log(req.headers.token)
        res.send({
            auth: false,
            token: null
        })
    }
}

module.exports = new apiController()