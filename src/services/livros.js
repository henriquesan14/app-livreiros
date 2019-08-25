import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    saveLivro: (livro) => {
        return axios.post(`${baseApiUrl}/livros`, livro);
    },
    editLivro: (idLivro, livro) => {
        return axios.put(`${baseApiUrl}/livros/${idLivro}`, livro);
    },
    getLivro: (id) => {
        return axios.get(`${baseApiUrl}/livros/${id}`);
    },
    uploadImage: (image) => {
        return axios.post(`${baseApiUrl}/livros/capa`, image, {});
    },
    searchIsbn: (isbn) => {
        return axios.get(`${baseApiUrl}/livros/isbn/${isbn}`);
    }
}