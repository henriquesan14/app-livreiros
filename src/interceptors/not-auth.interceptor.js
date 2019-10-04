import axios from 'axios'
import router from '../config/router'
import { userKey } from '@/global'


axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    if (error.response.status === 401 && localStorage.getItem(userKey)) {
        localStorage.removeItem(userKey)
        router.push('/')
    }
    return Promise.reject(error);
});