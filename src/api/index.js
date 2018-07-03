import {http, config} from '../util'

export default {
    login (username, password) {
        let data = new FormData()
        data.set('grant_type', config.grant_type)
        data.set('client_id', config.client_id)
        data.set('client_secret', config.client_secret)
        data.set('username', username)
        data.set('password', password)

        return http.post(
            '/oauth/token', data,
            {
                baseURL: 'http://localhost:3000',
                headers:
                {'Content-Type': 'multipart/form-data'}
            }
        )
    },
    getUserProfile (userId) {
        return http.get(`/users/${userId}`)
    }
}
