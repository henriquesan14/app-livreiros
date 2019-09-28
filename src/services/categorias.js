import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    saveCategoria: (categoria) => {
        return axios.get(`${baseApiUrl}/categorias`, categoria);
    },
    editCategoria: (idCategoria, categoria) => {
        return axios.put(`${baseApiUrl}/categorias/${idCategoria}`, categoria);
    },
    statusCategoria: (idCategoria) => {
        return axios.put(`${baseApiUrl}/categorias/${idCategoria}/status`);
    }
}