import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    getSolicitacoes: (page = 0, limite = 10) => {
        return axios.get(`${baseApiUrl}/solicitacoes?pagina=${page}&limite=${limite}`);
    },
    saveSolicitacao: (solicitacao) => {
        return axios.post(`${baseApiUrl}/solicitacoes`, solicitacao);
    },
    confirmarSolicitacao: (id) => {
        return axios.put(`${baseApiUrl}/solicitacoes/${id}/confirmar`);
    },
    cancelarSolicitacao: (id) => {
        return axios.put(`${baseApiUrl}/solicitacoes/${id}/cancelar`);
    }
}