import axios from 'axios';
import {getItem, setItem, KEY_ACCESS_TOKEN, removeItem} from './localStorageManager';

export const axiosClient = axios.create({

    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true
});
console.log(`Base URL: ${process.env.REACT_APP_SERVER_BASE_URL}`)

axiosClient.interceptors.request.use(
    (request) => {
        try {
            const accessToken = getItem('KEY_ACCESS_TOKEN');

            request.headers['Authorization'] = `Bearer ${accessToken}`;

            return request;
        } catch (e) {
            console.log(e);
        }
    }
);

axiosClient.interceptors.response.use(
    async (response) => {

        const data = response.data;
        const error = data.error;

        if (data.status === 'ok') {
            // console.log(`Response data: ${JSON.stringify(data)}`);
            return data;
        }
        const originalRequest = response.config;
        // console.log(`Original request: ${JSON.stringify(orginalRequest.url)}`);
        const statusCode = data.statusCode;

        if (statusCode === 401 && originalRequest.url === '/auth/refresh') {
            // console.log('Refresh token is expired');
            removeItem(KEY_ACCESS_TOKEN);
            window.location.href = '/login';
            return Promise.reject(error);
        }
        if (statusCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            // console.log('Access token is expired');
            const response = await axiosClient.get('/auth/refresh');
            console.log('Response from backend: ', response);
            if (response.status === 'ok') {
                try {
                    setItem(KEY_ACCESS_TOKEN, response.data.accessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                    console.log(`Original request: ${JSON.stringify(originalRequest)}`);
                    console.log(`token from backend: ${response.data.accessToken}`);
                    return axios(originalRequest);
                }
                catch (e) {
                    console.log(e);
                }
            }

        }
        return Promise.reject(error);
    }
);