import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'
import Home from '../components/Home'
import Login from '../components/Login'
import Training from '../components/Training'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/training',
      name: 'Training',
      component: Training
    }
  ],
  mode: 'history'
})

router.beforeEach(function (to, from, next) {
  // 进入路由之前对access token进行检查，如果没有access token
  // 或者access token过期，则转到登录界面
  if (!_.isEqual('/login', to.path) && !store.getters['user/isLogged']) {
    next({replace: true, path: '/login'})
  }
  next()
})

export default router
