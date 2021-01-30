const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: '192.168.0.115',
    port: '3306',
    user: 'root',
    password: 'Senha@123456',
    database: 'MePoupe',
});

module.exports = conexao;