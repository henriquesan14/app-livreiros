import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    getClientes: (nome = "", page = 0, limite = 10) => {
        return axios.get(`${baseApiUrl}/clientes?pagina=${page}&limite=${limite}&nomeCliente=${nome}`);
    }
}