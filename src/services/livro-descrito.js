import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    getLivroDescrito: (livro) => {
        return axios.post(`${baseApiUrl}/livros`, livro);
    },
    saveLivroDescrito: (livroDescrito) => {
        return axios.post(`${baseApiUrl}/livrosdescritos`, livroDescrito);
    },
    editLivroDescrito: (idLivroDescrito, livroDescrito) => {
        return axios.put(`${baseApiUrl}/livrosdescritos/${idLivroDescrito}`, livroDescrito);
    }
}