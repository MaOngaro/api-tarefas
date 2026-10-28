const express = require('express')
const router = express.Router()

const db = require('../db.js')

const tarefas = [
    { id: 1, titulo: "Carinho no gato", concluida: true },
    { id: 2, titulo: "Limpar caixinha de areia", concluida: false }
]

router.get('/', (req, res) => {
    const consulta = db.prepare("SELECT * FROM tarefas")
    const tarefas = consulta.all()
    res.json(tarefas)
})

let proximoId = 3

router.post('/', (req, res) => {
    if (!req.body.titulo || req.body.titulo.trim() === ""){
        res.status(400).json({ erro: "Adicione o título." })
        return
    }
    const titulo = req.body.titulo.trim()
    const ficha = db.prepare("INSERT INTO tarefas (titulo) VALUES (?)")
    const resultado = ficha.run(titulo)
    res.status(201).json( { id: resultado.lastInsertRowid, titulo: titulo, concluida: false } )
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = tarefas.findIndex(x => x.id === id)
    if (index === -1) {
        res.status(404).json({ erro: "ID não localizado." })
        return
    }
    tarefas.splice(index, 1)
    res.sendStatus(204)
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const tarefa = tarefas.find(x => x.id === id)
    if (tarefa === undefined) {
        res.status(404).json({ erro: "Tarefa não encontrada." })
        return
    }
    res.json(tarefa)
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const tarefa = tarefas.find(x => x.id === id)
    if (tarefa === undefined) {
        res.status(404).json({ erro: "Tarefa não encontrada." })
        return
    }
    if (!req.body.titulo || req.body.titulo.trim() === ""){
        res.status(400).json({ erro: "Adicione o título." })
        return
    }
    tarefa.titulo = req.body.titulo.trim()
    tarefa.concluida = req.body.concluida
    res.json(tarefa)
})

module.exports = router