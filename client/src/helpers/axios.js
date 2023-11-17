import axios from "axios";

const request = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://ipustaka-server.arvinaufal.my.id', // deployment / cloud
});

export default request;