const express = require('express')
const router = express.Router()

const db = require('../db.js')

const tarefas = [
    { id: 1, titulo: "Carinho no gato", concluida: true },
    { id: 2, titulo: "Limpar caixinha de areia", concluida: false }
]

router.get('/', (req, res) => {
    const consulta = db.prepare("SELECT * FROM tarefas")
    const linhas = consulta.all()

    const tarefas = linhas.map(linha => {
        return { ...linha, concluida: (linha.concluida === 1) }
    })

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
    const ficha = db.prepare("DELETE FROM tarefas WHERE id = ?")
    const resultado = ficha.run(id)
    if (resultado.changes === 0) {
        res.status(404).json({ erro: "ID não localizado." })
        return
    }

    res.sendStatus(204)
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const consulta = db.prepare("SELECT * FROM tarefas WHERE id = ?")
    const linha = consulta.get(id)
    if (linha === undefined) {
        res.status(404).json({ erro: "Tarefa não encontrada." })
        return
    }
    res.json({ ...linha, concluida: linha.concluida === 1 })
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)

    if (!req.body.titulo || req.body.titulo.trim() === ""){
        res.status(400).json({ erro: "Adicione o título." })
        return
    }

    const titulo = req.body.titulo.trim()
    const concluida = req.body.concluida ? 1 : 0
    const ficha = db.prepare("UPDATE tarefas SET titulo = ?, concluida = ? WHERE id = ?")
    const resultado = ficha.run(titulo, concluida, id)
    if (resultado.changes === 0) {
        res.status(404).json({ erro: "Tarefa não encontrada." })
        return
    }
    res.json({ id: id, titulo: titulo, concluida: req.body.concluida })
})

module.exports = router