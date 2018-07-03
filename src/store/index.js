// import _ from 'lodash';
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from '@/store/modules/user'

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    user
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
