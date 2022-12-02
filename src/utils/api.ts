import axios from 'axios';

const baseURL = 'http://localhost:8080';

export const sendRequest = async (url: string, method: string = 'GET', data: any = {}) => {
    const request = await axios.request({
        url,
        method,
        baseURL,
        data,
    });
    return request;
};