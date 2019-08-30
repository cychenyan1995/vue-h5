import Vue from 'vue'
import Router from 'vue-router'
import MarketActive from './views/marketActive/MarketActive'
import Login from './views/Login'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/addMarketActive',
      name: 'activeInsert',
      // 动态加载组件
      component: () => import('./components/AddMarketActive.vue'),
      meta: {in: 'in', next: '/addCostDesc', pre: '/', editPath: '/viewActiveDesc'}
    },
    {
      path: '/addCostDesc',
      name: 'addCostDesc',
      component: () => import('./components/AddCostDesc.vue'),
      meta: {in: 'in', next: '/targetInfo', pre: '/addMarketActive', editPath: '/viewActiveDesc'}
    },
    {
      path: '/targetInfo',
      name: 'targetInfo',
      component: () => import('./components/TargetInfo.vue'),
      meta: {next: '/targetInfo', pre: '/addCostDesc', editPath: '/viewActiveDesc'}
    },
    {
      path: '/addTargetMan',
      name: 'addTargetMan',
      component: () => import('./components/AddTargetMan.vue'),
      meta: {in: 'in', next: '/targetInfo', pre: '/targetInfo', editPath: '/targetInfo?type=edit'}
    },
    {
      path: '/sellManUpdate',
      name: 'sellManUpdate',
      component: () => import('./components/SellMan.vue'),
      meta: {next: '', pre: '/targetInfo', editPath: '/targetInfo?type=edit'}
    },
    {
      path: '/viewActiveDesc',
      name: 'viewActiveDesc',
      component: () => import('./components/ViewActiveDesc.vue'),
      meta: {next: '', pre: '/index'}
    },
    {
      path: '/sellManSelect',
      name: 'sellManSelect',
      component: () => import('./components/SellManSelect.vue'),
      meta: {next: '', pre: '/sellManUpdate', editPath: '/viewContactDesc'}
    },
    {
      path: '/viewContactDesc',
      name: 'viewContactDesc',
      component: () => import('./components/ViewContactDesc.vue'),
      meta: {next: '', pre: '/contact', editPath: ''}
    },
    {
      path: '/addContact',
      name: 'addContact',
      component: () => import('./components/contact/AddContact.vue'),
      meta: {next: '', pre: '/ViewActiveDesc', editPath: '/viewContactDesc'}
    },
    {
      path: '/infoRank',
      name: 'infoRank',
      component: () => import('./components/contact/InfoRank.vue'),
      meta: {next: '', pre: '/addContact', editPath: ''}
    },
    {
      path: '/contactRefer',
      name: 'contactRefer',
      component: () => import('./components/contact/ContactRefer.vue'),
      meta: {next: '', pre: '/viewContactDesc', editPath: ''}
    },
    {
      path: '/qrScan',
      name: 'qrScan',
      component: () => import('./components/QrScan.vue'),
      meat: {pre: '/viewActiveDesc'}
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('./components/popTemp/City.vue'),
      meat: {pre: '/addMarketActive'}
    },
    {
      path: '/industry',
      name: 'industry',
      component: () => import('./components/popTemp/Industry.vue'),
      meat: {pre: '/addMarketActive'}
    },
    {
      path: '/assistMan',
      name: 'assistMan',
      component: () => import('./components/popTemp/AssistMan.vue'),
      meta: {pre: '/addMarketActive'}
    },
    {
      path: '/editCanMan',
      name: 'editCanMan',
      component: () => import('./components/EditCanMan.vue'),
      meta: {pre: '/sellManUpdate?user=manager', keepAlive: true}
    },
    {
      path: '/searchPage',
      name: 'searchPage',
      component: () => import('./views/search-page'),
      meta: {}
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'index',
          name: 'index',
          alias: '',
          component: MarketActive,
        },
        {
          path: 'me',
          name: 'me',
          component: () => import('./views/About.vue')
        },
        {
          path: 'contact',
          name: 'contact',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/contact/Contact.vue')
        },
        {
          path: '*',
          redirect: '/login'
        }
      ]
    }
  ]
})
