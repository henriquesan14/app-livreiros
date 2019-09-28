import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    getStats: () => {
        return axios.get(`${baseApiUrl}/estatisticas`);
    }
}