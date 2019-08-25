import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    getLivroDescrito: (livro) => {
        return axios.post(`${baseApiUrl}/livros`, livro);
    }
}