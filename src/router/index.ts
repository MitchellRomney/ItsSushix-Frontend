import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home.vue"
// @ts-ignore
import * as JWT from 'jwt-decode'
import {PlatformModule} from "@/store/modules/platform"
import {AuthModule} from "@/store/modules/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: () => import("@/views/Leaderboard.vue"),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login.vue"),
  },
  {
    path: '/notion',
    beforeEnter() {
      // @ts-ignore
      window.location = "https://www.notion.so/1309c62f30074c26902db4030e70933e?v=78293f405a8f4273937b79af668740a0"
    }
  },
  {
    path: '/loading',
    name: 'Loading',
    component: () => import("@/views/Loading.vue"),
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: () => import("@/views/Profile.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

function addDays(date: Date, days: number) {
  date.setDate(date.getDate() + days);
  return date;
}

router.beforeEach((to, from, next) => {

  let token = Vue.prototype.$cookie.get('token')

  if (token) {

    // If there is a JWT token, always use it as Auth header.
    Vue.prototype.$http.defaults.headers.common['Authorization'] = `JWT ${token}`

    let token_payload = JWT(token)
    let token_creation = new Date(token_payload.origIat * 1000)
    if (addDays(token_creation, 7) < new Date(Date.now())) {
      delete Vue.prototype.$http.defaults.headers.common['Authorization']

      if (to.name !== 'Login') {
        next({
          name: 'Login',
          query: {
            nextUrl: to.fullPath
          }
        })
      } else {
        next()
      }
    } else if (!PlatformModule.loaded && to.name !== 'Loading') {
      next({
        name: 'Loading',
        query: {
          nextUrl: to.fullPath
        }
      })
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (!AuthModule.user || !AuthModule.user.isSuperuser) {
        next({
          name: 'Home'
        })
      }
    }
  } else if (to.matched.some(record => record.meta.requiresLogin)) {
    next({
      name: 'Login',
      query: {
        nextUrl: to.fullPath
      }
    })
  }

  // Send the user to wherever they intended to go.
  next()
})

export default router
