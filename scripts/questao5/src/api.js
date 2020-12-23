import axios from 'axios';

// A partir desta baseURL, todas as 
// requisições partirão deste endereço
const api = axios.create({
    baseURL: 'https://api.github.com/users',
})

export default api;