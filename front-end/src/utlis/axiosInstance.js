import axios from "axios";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
    (config) => {
        var baseURI = '/api';
        if (config.url) config.url = `${baseURI}${config.url[0]!=="//" ? config.url : `/${config.url}`}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;