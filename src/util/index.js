import axios from 'axios'
import store from '../store'
import config from './config'

const http = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

http.interceptors.request.use(function (config) {
    if (store.getters['user/isLogged']) {
        config.headers['Authorization'] = `Bearer ${store.state.user.auth.accessToken}`
    }

    return config
}, function (error) {
    return Promise.reject(error)
})

export {http, config}
