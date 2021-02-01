require('dotenv/config')
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./src/routes/routes')
const morgan = require('morgan')
const port = process.env.PORT
const swaggerJSDoc = require('swagger-jsdoc');

var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:4000',
    basePath: '/',
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js'],
};

var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

app.use(cors())
app.use(express.json())
app.use(router)
app.use(morgan('dev'))
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })