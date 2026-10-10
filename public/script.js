const ulLista = document.getElementById("lista")

function mostrarTarefas(tarefas) {
    for(const t of tarefas) {
        const ulLi = document.createElement("li")
        const ulImput = document.createElement("input")
            ulImput.type = "checkbox"
            ulImput.checked = t.concluida
        const ulSpan = document.createElement("span")
            ulSpan.textContent = t.titulo
        const ulButton = document.createElement("button")
            ulButton.textContent = "Excluir"

        ulLi.append(ulImput, ulSpan, ulButton)
        ulLista.append(ulLi)
    }
}

async function carregarTarefas() {
    const resposta = await fetch("/tarefas")
    const lista = await resposta.json()
    mostrarTarefas(lista)
}

carregarTarefas()