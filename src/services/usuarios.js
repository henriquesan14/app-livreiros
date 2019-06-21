import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    saveUsuario: () => {
        return axios.post(`${baseApiUrl}/usuarios`);
    },
    editUsuario: (idUsuario) => {
        return axios.put(`${baseApiUrl}/usuarios/${idUsuario}`);
    }
}