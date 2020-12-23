import api from './api';

class BuscadorDeRepositorios {
    constructor() {
        this.repositorios = []; // Array para armazenar os repositórios buscados

        // Para poder ser usado quando for submetido
        this.formElement = document.getElementById("form-repositorios");
        // Para obter o nome do user
        this.inputElement = document.getElementById("user");
        // Para setar os repositórios na lista
        this.listElement = document.getElementById("list-repositorios");
        // Para mostrar a foto do usuário junto com seus repositórios
        this.avatarURL = '';

        // Para quando o usuario submeter o formulário
        this.registerHandlers();
    }

    registerHandlers() {
        this.formElement.onsubmit = event => this.addRepositorios(event);
    }

    // async, pois fará requisições a API
    async addRepositorios(event) {
        // Para impedir que o formulário recarregue a página
        event.preventDefault();

        const username = this.inputElement.value;
        if(username.length === 0) {
            // Mensagem de erro para caso o usuário não tiver informado o username
            alert('[ERRO] Você deve informar um nome de usuário do GitHub.');
            return;
        }

        this.setLoading();

        try {
            // Usando o axios para obter os dados da API
            const response = await api.get(`/${username}/repos`);

            this.repositorios = [];
            response.data.forEach(repo => {
                // Para cada repositório, seu nome é setado no array de repositorios
                this.repositorios.push(repo.name);
            });
            // Obtendo a foto do perfil do usuario do GitHub
            this.avatarURL = response.data[0].owner.avatar_url;

            this.render();

        } catch(err) {
            // Mensagem de erro para caso algum erro ocorra
            alert('[ERRO] Não foi possível obter os repositórios deste usuário.');
        }

        // Preparando o formulário para o próximo username
        this.inputElement.value = '';
        this.inputElement.focus();
        this.setLoading(false);
    }

    setLoading(loading = true) {
        if(loading) {
            let loadingElement = document.createElement('span');
            loadingElement.appendChild(document.createTextNode('Carregando...'));
            loadingElement.setAttribute('id', 'loading');

            this.formElement.appendChild(loadingElement);
        } else {
            document.getElementById('loading').remove();
        }
    }

    render() {
        // Reiniciando a lista para que os repositórios não sejam acumulados
        this.listElement.innerHTML = '';

        // Adicionando a foto do usuário à página
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', this.avatarURL);
        this.listElement.appendChild(imageElement);

        let infoNomeElement = document.createElement('h1');
        infoNomeElement.appendChild(document.createTextNode('Repositórios:'));
        this.listElement.appendChild(infoNomeElement);

        this.repositorios.map(repositorio => {
            let repositorioElement = document.createElement('li');
            let repositorioNomeElement = document.createElement('h2');
            repositorioNomeElement.appendChild(document.createTextNode(repositorio));

            repositorioElement.appendChild(repositorioNomeElement);
            this.listElement.appendChild(repositorioElement);
        })
    }
}

new BuscadorDeRepositorios();