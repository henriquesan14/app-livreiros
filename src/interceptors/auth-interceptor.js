import axios from 'axios'
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