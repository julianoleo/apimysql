class tarefaValidation {
    verificaID(id) {
        if(Number.isInteger(parseInt(id)) == true) {
            return 1
        } else {
            return 0
        }
    }
}

module.exports = new tarefaValidation()