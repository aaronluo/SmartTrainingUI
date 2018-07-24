// import _ from 'lodash';
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import common from '../store/modules/common'
import user from '@/store/modules/user'
import training from '../store/modules/training'
import trainee from '../store/modules/trainee'

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    common,
    user,
    training,
    trainee
  },
  plugins: [createPersistedState({
    key: 'smarttraining',
    paths: [
      'user.auth'
    ]
  })],
  strict: debug
})

// store.subscribe((mutation, state) => {
//   console.log(mutation)
//   console.log(state)
// })

export default store
