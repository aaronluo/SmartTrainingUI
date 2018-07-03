// import * as types from '../types';
import _ from 'lodash'
import moment from 'moment'
import api from '../../api'
import jwtDecode from 'jwt-decode'

const state = {
  auth: {
    accessToken: null,
    refreshToken: null,
    expireDate: moment(),
    username: null,
    userId: 0,
    roles: []
  },
  loggedUser: null
}
const mutations = {
  updateUserAuth (state, data) {
    state.auth.accessToken = data.access_token
    state.auth.refreshToken = data.refresh_token
    state.auth.expireDate = moment().add(data.expires_in, 's')
    let decodedToken = jwtDecode(data.access_token)
    state.auth.username = decodedToken.user_name
    state.auth.roles = decodedToken.authorities
    state.auth.userId = decodedToken.user_id
  },
  updateUserProfile (state, data) {
    state.loggedUser = data
  },
  cleanAuth (state) {
    state.auth.accessToken = null
    state.auth.refreshToken = null
    state.auth.expireDate = moment()
    state.auth.userId = 0
    state.auth.roles = []
  }
}

const actions = {
  login ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      api.login(payload.username, payload.password).then(res => {
        if (res.status === 200) {
          commit('updateUserAuth', res.data)
          api.getUserProfile(state.auth.userId).then(res => {
            commit('updateUserProfile', res.data)
            resolve(res.data)
          }).catch(err => {
            reject(err.message)
          })
        } else {
          reject(res.status)
        }
      }).catch(err => reject(err.message))
    })
  },
  restoreUserProfile ({commit, state}) {
    api.getUserProfile(state.auth.userId).then(res => {
      commit('updateUserProfile', res.data)
    }).catch(err => {
      console.log(err.message)
      commit('cleanAuth')
    })
  }
}

const getters = {
  // 判断是否有登录用户信息
  isLogged (state) {
    let expireDate = state.auth.expireDate
    if (typeof expireDate === 'string') {
      expireDate = moment(expireDate)
    }

    if (_.isNull(state.auth.accessToken) || _.isNull(state.auth.username) ||
     expireDate.isBefore(moment())) {
      return false
    } else {
      return true
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
