import Vue from 'vue'
import Router from 'vue-router'
import Intro from './views/Intro.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import(/* webpackChunkName: "about" */ './views/Quiz.vue')
    }
  ]
})
