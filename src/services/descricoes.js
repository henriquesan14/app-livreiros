import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    saveDescricao: (descricao) => {
        return axios.post(`${baseApiUrl}/descricoes`, descricao);
    },
    editDescricao: (idDescricao, descricao) => {
        return axios.put(`${baseApiUrl}/descricoes/${idDescricao}`, descricao);
    },
    statusDescricao: (idDescricao) => {
        return axios.put(`${baseApiUrl}/descricoes/${idDescricao}/status`);
    }
}