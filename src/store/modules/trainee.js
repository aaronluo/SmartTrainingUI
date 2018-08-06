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
    getTrainee ({commit}, payload) {
        return new Promise((resolve, reject) => {
            api.getTrainee(payload).then(res => {
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
    },
    getTrainingLogs ({commit}, payload) {
        return new Promise((resolve, reject) => {
            api.getTrainingLogs(payload.traineeId, payload.accountId, payload.pagination).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.message)
            })
        })
    },
    getDepositeLogs ({commit}, payload) {
        return new Promise((resolve, reject) => {
            api.getDepositeLogs(payload.traineeId, payload.accountId, payload.pagination).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.message)
            })
        })
    },
    addMoney ({commit}, payload) {
        return new Promise((resolve, reject) => {
            api.addMoney(payload.traineeId, payload.accountId, payload.amount, payload.comment).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.message)
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
