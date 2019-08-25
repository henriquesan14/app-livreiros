import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    saveGrupo: (grupo) => {
        return axios.post(`${baseApiUrl}/grupos`, grupo);
    },
    editGrupo: (idGrupo, grupo) => {
        return axios.put(`${baseApiUrl}/grupos/${idGrupo}`, grupo);
    },
    getGrupo: (id) => {
        return axios.get(`${baseApiUrl}/grupos/${id}`);
    },

}