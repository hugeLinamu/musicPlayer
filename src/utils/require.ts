import axios from 'axios';

const request = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000,
});

request.interceptors.request.use(
    // (config) => {
    //     // Do something before request is sent
    //     return config;
    // },
    // (error) => {
    //     // Do something with request error
    //     return Promise.reject(error);
    // },
);

export default request;