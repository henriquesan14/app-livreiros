import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    saveUsuario: (usuario) => {
        return axios.post(`${baseApiUrl}/usuarios`, usuario);
    },
    editUsuario: (idUsuario, usuario) => {
        return axios.put(`${baseApiUrl}/usuarios/${idUsuario}`, usuario);
    },
    getUsuario: (id) => {
        return axios.get(`${baseApiUrl}/usuarios/${id}`);
    },
    statusUser: (idUsuario) => {
        return axios.put(`${baseApiUrl}/usuarios/${idUsuario}/status`);
    }
}