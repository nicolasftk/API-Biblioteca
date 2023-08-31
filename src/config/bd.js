const { Pool } = require('pg')
const { hostBd, portBd, userBd, passwordBd, databaseBd } = require('../../dadosSensiveis')
const pool = new Pool({
    host: hostBd,
    port: portBd,
    user: userBd,
    password: passwordBd,
    database: databaseBd
})

module.exports = pool