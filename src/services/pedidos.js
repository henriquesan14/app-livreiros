import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    getPedidos: (page = 0, limite = 10, status = '', dataInicio = '', dataFim = '', tipo = '') => {
        return axios.get(`${baseApiUrl}/pedidos?pagina=${page}&limite=${limite}&statusPedido=${status}&dataIni=${dataInicio}&dataFim=${dataFim}&tipoPedido=${tipo}`);
    },
    getPedido: (idPedido) => {
        return axios.get(`${baseApiUrl}/pedidos/${idPedido}`);
    },
    savePedido: (pedido) => {
        return axios.post(`${baseApiUrl}/pedidos`, pedido);
    },
    importPedido: (file) => {
        return axios.post(`${baseApiUrl}/pedidos/importar`, file, {});
    }
}