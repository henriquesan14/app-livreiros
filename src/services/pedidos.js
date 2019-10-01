import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    getPedidos: (page = 0, limite = 10) => {
        return axios.get(`${baseApiUrl}/pedidos?pagina=${page}&limite=${limite}`);
    },
    savePedido: (pedido) => {
        return axios.post(`${baseApiUrl}/pedidos`, pedido);
    }
}