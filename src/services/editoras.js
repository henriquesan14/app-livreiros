import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    saveEditora: (editora) => {
        return axios.post(`${baseApiUrl}/editoras`, editora);
    },
    editEditora: (idEditora, editora) => {
        return axios.put(`${baseApiUrl}/editoras/${idEditora}`, editora);
    },
}