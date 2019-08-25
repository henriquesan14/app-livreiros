import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    saveAutor: (autor) => {
        return axios.post(`${baseApiUrl}/autores`, autor);
    },
    editAutor: (idAutor, autor) => {
        return axios.put(`${baseApiUrl}/autores/${idAutor}`, autor);
    },
}