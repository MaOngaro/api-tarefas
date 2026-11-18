const express = require('express')
const app = express()
const tarefasRouter = require('./routes/tarefas');

app.use(express.json())
app.use(express.static('public'))
app.use('/tarefas', tarefasRouter)

module.exports = app