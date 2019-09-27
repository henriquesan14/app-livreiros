import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    getSolicitacoes: (page = 0, limite = 10, status = '', dataInicio = '', dataFim = '') => {
        return axios.get(`${baseApiUrl}/solicitacoes?pagina=${page}&limite=${limite}&status=${status}&dataIni=${dataInicio}&dataFim=${dataFim}`);
    },
    saveSolicitacao: (solicitacao) => {
        return axios.post(`${baseApiUrl}/solicitacoes`, solicitacao);
    },
    statusSolicitacao: (id, status) => {
        return axios.put(`${baseApiUrl}/solicitacoes/${id}/status`, status);
    }
}