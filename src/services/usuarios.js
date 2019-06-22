import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    saveUsuario: (usuario) => {
        return axios.post(`${baseApiUrl}/usuarios`, usuario);
    },
    editUsuario: (usuario, idUsuario) => {
        return axios.put(`${baseApiUrl}/usuarios/${idUsuario}`, usuario);
    }
}