const ulLista = document.getElementById("lista")

function mostrarTarefas(tarefas) {
    ulLista.innerHTML = ""
    for(const t of tarefas) {
        const ulLi = document.createElement("li")
        const ulInput = document.createElement("input")
            ulInput.type = "checkbox"
            ulInput.checked = t.concluida
        const ulSpan = document.createElement("span")
            ulSpan.textContent = t.titulo
        const ulButton = document.createElement("button")
            ulButton.textContent = "Excluir"
        
        ulButton.addEventListener("click", async () => {
            await fetch(`/tarefas/${t.id}`, { method: "DELETE" })
            carregarTarefas()
        })

        ulLi.append(ulInput, ulSpan, ulButton)
        ulLista.append(ulLi)
    }
}

async function carregarTarefas() {
    const resposta = await fetch("/tarefas")
    const lista = await resposta.json()
    mostrarTarefas(lista)
}

const formHTML = document.getElementById("formulario")
const inputHTML = document.getElementById("campo")
const avisoP = document.getElementById("aviso")

formHTML.addEventListener("submit", async (evento) => {
    evento.preventDefault()
    const resultado = await fetch("/tarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: inputHTML.value })
    })
    if (!resultado.ok) {
        avisoP.textContent = "Escreva um título para a tarefa."
        return
    }
    avisoP.textContent = ""
    carregarTarefas()
    inputHTML.value = ""
    inputHTML.focus()
})


carregarTarefas()