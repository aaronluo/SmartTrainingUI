// import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/user';

Vue.use(Vuex);
let debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user
  },
  strict: debug
});