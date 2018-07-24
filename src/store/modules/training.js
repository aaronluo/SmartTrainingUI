import api from '../../api'

const state = {
    avaiableTrainings: []
}

const mutations = {
    updateAvaiableTrainings (state, data) {
        state.avaiableTrainings = data
    }
}

const actions = {
    loadAvaiableTrainings ({commit}) {
        api.getAvaiableTrainings().then(res => {
            commit('updateAvaiableTrainings', res.data)
        }).catch(err => {
            console.log(`get avaiable training err [${err.message}]`)
        })
    },
    createNewTraining ({commit}, payload) {
        return new Promise((resolve, reject) => {
            api.createNewTraining(payload).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.message)
            })
        })
    },
    getTraining ({commit}, payload) {
        return new Promise((resolve, reject) => {
            api.getTraining(payload).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.message)
            })
        })
    },
    getInvolvedUsers ({commit}, payload) {
        return new Promise((resolve, reject) => {
            api.getUsersByTraining(payload.trainingId, payload.page, payload.size).then(res => {
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
