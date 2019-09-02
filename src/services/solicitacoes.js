import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    getSolicitacoes: (page = 0, limite = 10) => {
        return axios.get(`${baseApiUrl}/solicitacoes?pagina=${page}&limite=${limite}`);
    },
    saveSolicitacao: (solicitacao) => {
        return axios.post(`${baseApiUrl}/solicitacoes`, solicitacao);
    }
}