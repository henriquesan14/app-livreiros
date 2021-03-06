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
    updatePedido: (pedido) => {
        return axios.put(`${baseApiUrl}/pedidos/${pedido.idPedido}`, pedido);
    },
    importPedido: (file) => {
        return axios.post(`${baseApiUrl}/pedidos/importar`, file, {});
    },
    relatorios: (page = 0, limite = 10, dataInicio = '', dataFim = '') => {
        return axios.get(`${baseApiUrl}/pedidos/relatorio/graficos?pagina=${page}&limite=${limite}&dataIni=${dataInicio}&dataFim=${dataFim}`);
    },
    updateRastreamentos(){
        return axios.put(`${baseApiUrl}/pedidos/rastreamentos`, {});
    }
}