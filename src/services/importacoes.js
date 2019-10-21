import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    getImportacoes: (page = 0, limite = 10) => {
        return axios.get(`${baseApiUrl}/importacaopedido?pagina=${page}&limite=${limite}`);
    },
}