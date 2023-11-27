const axios = require('axios');
const {encode,decode} = require('./encryption')

const apiClient = (config={}) => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_URL+'/api',
        timeout: 10000
    })
    // Add a request interceptor
    instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.data = encode(
            {
                method: config.method,
                data: config?.data,
                params: config?.params
            }
        )
        config.method = 'POST';
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // console.log('response decode')
        response.data = decode(response?.data?.data)
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });

    return instance;
}

module.exports = {
    apiClient
}