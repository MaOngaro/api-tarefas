const express = require('express')
const app = express()
const tarefasRouter = require('./routes/tarefas')

app.use(express.json())
app.use('/tarefas', tarefasRouter)

const port = 3000

app.get('/', (req, res) => {
    res.send('API de tarefas no ar')
})

app.listen(port, () => {
    console.log(`Servidor rodando em: ${port}`)
})