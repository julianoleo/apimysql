const { check } = require('express-validator')

exports.listarPorId = [
    check('id')
        .exists().withMessage('O id não pode estar em branco')
        .isInt().withMessage('O id deve ser numérico')
]