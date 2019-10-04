import axios from 'axios'
import router from '../config/router'
import { userKey } from '@/global'


axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    if (error.response.status === 403 && localStorage.getItem(userKey)) {
        router.push('/dashboard/error403')
    }
    return Promise.reject(error);
});