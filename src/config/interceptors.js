import axios from 'axios'
import router from './router'
import { userKey, baseApiUrl } from '@/global'

axios.interceptors.request.use(function (config) {
    const auth = JSON.parse(localStorage.getItem(userKey));
    const n = baseApiUrl.length;
    const requestToAPI = config.url.substring(0, n) === baseApiUrl;
    if (requestToAPI && auth) {
        config.headers.Authorization = auth.token;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    if (error.response.status === 401 && localStorage.getItem(userKey)) {
        localStorage.removeItem(userKey)
        router.push('/')
    }
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    if (error.response.status === 403 && localStorage.getItem(userKey)) {
        router.push('/dashboard/error403')
    }
    return Promise.reject(error);
});