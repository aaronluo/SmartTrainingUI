// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'babel-polyfill'
import moment from 'moment'
import App from './App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import { messages, numberFormats } from './util/i18n'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import './assets/css/main.less'

Vue.config.productionTip = false

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'cn',
  messages,
  numberFormats
})

Vue.use(Vuetify, {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
})

Vue.filter('registerAge', function (value) {
  var duration = moment().diff(moment(value), 'years', true)
  return duration.toFixed(1)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
