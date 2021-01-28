import axios from 'axios';

// creates the movie promised base http client
export const Movie = axios.create({
    baseURL: 'https://5f50ca542b5a260016e8bfb0.mockapi.io/',
})