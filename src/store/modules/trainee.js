import api from '../../api'

const state = {}

const mutations = {}

const actions = {
    getTrainees ({commit}, payload) {
        return new Promise((resolve, reject) => {
            api.getTrainees(payload.page, payload.size).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.message)
            })
        })
    },
    createTraineeAccount ({commit}, payload) {
        return new Promise((resolve, reject) => {
            api.createUserAccount(payload).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.response.data.errMsg)
            })
        })
    },
    addAddtionalProps ({commit}, payload) {
        return new Promise((resolve, reject) => {
            api.addAddtionalProps(payload.userId, payload.props).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.response.data.errMsg)
            })
        })
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
