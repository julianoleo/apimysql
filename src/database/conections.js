var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '192.168.0.115',
        user: 'root',
        password: 'Senha@123456',
        database: 'api'
    }
});
module.exports = knex