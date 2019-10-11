import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    getClientes: (nome = "", page = 0, limite = 10) => {
        return axios.get(`${baseApiUrl}/clientes?pagina=${page}&limite=${limite}&nomeCliente=${nome}`);
    },
    getCliente: (idCliente) => {
        return axios.get(`${baseApiUrl}/clientes/${idCliente}`);
    },
    saveCliente: (cliente) => {
        return axios.post(`${baseApiUrl}/clientes`, cliente);
    },
    editCliente: (idCliente, cliente) => {
        return axios.put(`${baseApiUrl}/clientes/${idCliente}`, cliente);
    }
}