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
    },
    getAvaiableTrainings () {
        return http.get('/trainings')
    },
    createNewTraining (training) {
        return http.post('/trainings', training)
    },
    getTraining (trainingId) {
        return http.get(`/trainings/${trainingId}`)
    },
    getUsersByTraining (trainingId, page, size) {
        const query = {
            page,
            size
        }

        return http.post(`/trainings/${trainingId}/users/query`, query)
    },
    getTrainees (page, size) {
        const query = {
            page,
            size,
            roles: ['ROLE_TRAINEE']
        }

        return http.post('/users/query', query)
    },
    getTrainee (id) {
        return http.get(`/users/${id}`)
    },
    createUserAccount (account) {
        return http.post('/users', account)
    },
    addAddtionalProps (userId, props) {
        return http.post(`/users/${userId}/properties`, props)
    },
    getTrainingLogs (traineeId, accountId, pagination) {
        return http.post(`/users/${traineeId}/accounts/${accountId}/trainingLogs/query`, pagination)
    },
    getDepositeLogs (traineeId, accountId, pagination) {
        return http.post(`/users/${traineeId}/accounts/${accountId}/deposite/query`, pagination)
    },
    addMoney (traineeId, accountId, amount, comment) {
        const payload = {
            amount,
            comment
        }

        return http.post(`/users/${traineeId}/accounts/${accountId}/deposite`, payload)
    }
}
