const state = {
    noteSettings: {
        color: 'success',
        timeout: 0,
        text: '',
        show: false
    }
}

const mutations = {
    showNotification (state, payload) {
        state.noteSettings.color = payload.color || 'success'
        // state.noteSettings.timeout = payload.timeout || 5000
        state.noteSettings.text = payload.text || ''
        state.noteSettings.show = true
    },
    hideNotification (state) {
        state.noteSettings.show = false
        state.noteSettings.color = 'success'
        state.noteSettings.timeout = 0
        state.noteSettings.text = ''
    }
}

const actions = {}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
