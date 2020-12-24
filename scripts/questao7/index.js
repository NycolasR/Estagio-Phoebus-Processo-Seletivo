const express = require('express');
const fs = require('fs'); // Para manipular arquivos no filesystem

const server = express();
const router = express.Router();

const readfile = () => {
    const content = fs.readFileSync('./db.json', 'utf-8');
    return JSON.parse(content) || [] ;
}

const writeFile = (content) => {
    const updateFile = JSON.stringify(content);
    fs.writeFileSync('./db.json', updateFile, 'utf-8');
}

server.use(express.json({ extended: true }));

// Inserir novo contato
router.post('/', (request, response) => {
    const {name, telefone, email } = request.body;
    const conteudoAtual = readfile();

    // Ao invés do usuário informar o id no corpo do JSON,
    // o sistema o calcula automaticamente.
    const id = Math.random().toString(32).substr(2, 9);

    conteudoAtual.push({
        id,
        name,
        telefone,
        email,
    });
    writeFile(conteudoAtual);
    response.send({ id, name, telefone, email });
})

// Alterar um contato existente
router.put('/:id', (request, response) => {
    const { id } = request.params; // ID informado na URL
    const { name, telefone, email } = request.body; // Valores informados no corpo da requisição

    const conteudoAtual = readfile();
    // Encontrando o registro com o ID informado
    const index = conteudoAtual.findIndex(registro => registro.id == id);

    // Obtendo os valores do registro existente
    const { name: nomeAtual, telefone: telefoneAtual, email: emailAtual } = conteudoAtual[index];

    const novoRegistro = {
        // O valor das variáveis só será atualizado se seu valor foi passado no corpo do JSON
        // Ex.: o novo valor de name será o informado no corpo da requisição
        // somente se ele tiver sido informado, caso contrário continuará sendo o que já estava presente
        id,
        name: name ? name : nomeAtual,
        telefone: telefone ? telefone : telefoneAtual,
        email: email ? email : emailAtual,
    }

    conteudoAtual[index] = novoRegistro;
    writeFile(conteudoAtual);
    response.send(novoRegistro);
})

// Excluir um contato existente
router.delete('/:id', (request, response) => {
    const { id } = request.params;
    const conteudoAtual = readfile();
    // Encontrando o registro com o ID informado
    const index = conteudoAtual.findIndex(registro => registro.id == id);
    
    if(index != -1) {
        conteudoAtual.splice(index, 1);
        writeFile(conteudoAtual);
    }
    response.send(conteudoAtual);
})

// Consultar um contato pelo nome
router.get('/:nome', (request, response) => {
    const nome = request.params.nome;

    const content = readfile();

    const registro = content.find(registro => registro.name == nome);
    response.send(registro);
})

// Consultando todos os registros
router.get('/', (request, response) => {
    response.send(readfile());
})

server.use(router);
server.listen(3000, () => console.log("Rodando servidor."))