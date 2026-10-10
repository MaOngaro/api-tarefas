async function carregarTarefas() {
    const resposta = await fetch("/tarefas")
    const lista = await resposta.json()
    console.log(lista)
}

carregarTarefas()