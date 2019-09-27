import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    getLivroDescrito: (id) => {
        return axios.get(`${baseApiUrl}/livrosdescritos/${id}`);
    },
    saveLivroDescrito: (livroDescrito) => {
        return axios.post(`${baseApiUrl}/livrosdescritos`, livroDescrito);
    },
    editLivroDescrito: (idLivroDescrito, livroDescrito) => {
        return axios.put(`${baseApiUrl}/livrosdescritos/${idLivroDescrito}`, livroDescrito);
    }
}