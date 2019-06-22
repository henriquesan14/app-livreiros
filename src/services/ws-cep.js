import axios from 'axios';

export default {
    buscaCep: (cep) => {
        return axios.get(`http://viacep.com.br/ws/${cep}/json/`);
    }
}