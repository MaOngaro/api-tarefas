const express = require('express')
const app = express()

const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API de tarefas no ar')
})

const tarefas = [
    { id: 1, titulo: "Carinho no gato", concluida: true },
    { id: 2, titulo: "Limpar caixinha de areia", concluida: false }
]

app.get('/tarefas', (req, res) => {
    res.json(tarefas)
})

let proximoId = 3

app.post('/tarefas', (req, res) => {
    const novaTarefa = { id: proximoId, titulo: req.body.titulo, concluida: false }
    proximoId++
    tarefas.push(novaTarefa)
    res.status(201).json(novaTarefa)
})

app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = tarefas.findIndex(x => x.id === id)
    if (index === -1) {
        res.status(404).json({ erro: "ID não localizado." })
        return
    }
    tarefas.splice(index, 1)
    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Servidor rodando em: ${port}`)
})