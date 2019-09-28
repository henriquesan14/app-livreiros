import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    saveAssunto: (assunto) => {
        return axios.post(`${baseApiUrl}/assuntos`, assunto);
    },
    editAssunto: (idAssunto, assunto) => {
        return axios.put(`${baseApiUrl}/assuntos/${idAssunto}`, assunto);
    },
}