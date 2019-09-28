import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    getEstados: () => {
        return axios.get(`${baseApiUrl}/estados`);
    },
    getCidades: (idEstado) => {
        return axios.get(`${baseApiUrl}/estados/${idEstado}/cidades`);
    }
}