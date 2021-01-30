const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'www.qualitysys.com.br',
    port: '3300',
    user: 'root',
    password: 'Senha@123456',
    database: 'MePoupe',
});

module.exports = conexao;