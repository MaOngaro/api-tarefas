# Lista de Tarefas

API REST de tarefas feita com Node.js e Express, acompanhada de uma interface web em HTML, CSS e JavaScript puros. O projeto cobre um CRUD completo, do servidor até a tela, com validação de dados e tratamento de erros.

![Tela do Lista de Tarefas com quatro tarefas, duas delas marcadas como concluídas](docs/tela.png)

## O que ele faz

- Lista, cria, busca, atualiza e remove tarefas
- Marca uma tarefa como concluída pela caixinha, direto na tela
- Recusa títulos vazios e responde com mensagens de erro claras
- Avisa a pessoa na interface quando o servidor rejeita um envio
- Adapta o layout para telas de celular

## Tecnologias

- **Node.js** e **Express** no servidor
- **HTML, CSS e JavaScript** sem framework no front-end, usando `fetch` para falar com a API
- **Google Fonts** (Luckiest Guy e Fira Sans)
- **SQLite** para guardar as tarefas, pelo módulo `node:sqlite` que já vem embutido no Node


## Como rodar

É preciso ter o [Node.js](https://nodejs.org) na versão 24 ou mais nova, porque o projeto usa o módulo `node:sqlite`, embutido no Node.

```bash
git clone https://github.com/MaOngaro/api-tarefas.git
cd api-tarefas
npm install
node index.js
```

Na primeira execução, o arquivo do banco (`tarefas.db`) é criado sozinho. Ele não vai para o repositório, então cada computador começa com o seu banco vazio.

Depois, abra [http://localhost:3000](http://localhost:3000) no navegador.

## Endpoints

| Método | Rota             | O que faz                    | Respostas        |
|--------|------------------|------------------------------|------------------|
| GET    | `/tarefas`       | Lista todas as tarefas       | 200              |
| GET    | `/tarefas/:id`   | Busca uma tarefa pelo id     | 200, 404         |
| POST   | `/tarefas`       | Cria uma tarefa              | 201, 400         |
| PUT    | `/tarefas/:id`   | Atualiza título e conclusão  | 200, 400, 404    |
| DELETE | `/tarefas/:id`   | Remove uma tarefa            | 204, 404         |

Exemplo de corpo para `POST` e `PUT`:

```json
{
  "titulo": "Regar as plantas",
  "concluida": false
}
```

No `POST`, só o `titulo` é necessário. No `PUT`, o título continua obrigatório e o campo `concluida` define o novo estado. Quando o título falta ou está vazio, a API responde `400` com `{ "erro": "Adicione o título." }`. Quando o id não existe, a resposta é `404`.

## Estrutura do projeto

```
api-tarefas/
├── docs/
│   └── tela.png
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── routes/
│   └── tarefas.js
├── db.js
└── index.js
```

O Express serve a pasta `public` como vitrine do site, e as rotas da API ficam separadas em `routes/tarefas.js`, ligadas ao servidor com `Router`. O `db.js` abre o banco SQLite e cria a tabela de tarefas se ela ainda não existir.

## Decisões e limitações

- **Dados em SQLite.** As tarefas ficam num arquivo de banco e continuam lá depois de reiniciar o servidor. O `concluida` é guardado como 0 ou 1 e convertido para `false` ou `true` na hora de responder.
- **Ids que não se repetem.** O próprio banco gera cada id, então apagar uma tarefa nunca faz outra herdar o número dela.
- **Front-end sem framework.** A escolha foi proposital, para praticar manipulação do DOM e eventos na base da linguagem.

## Próximos passos

- Cobrir as rotas com testes automatizados (Jest e Supertest)

## Créditos

- Ícone da estrela: [Bootstrap Icons](https://icons.getbootstrap.com), licença MIT
- Fontes: [Google Fonts](https://fonts.google.com)
