import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueAxios from './plugins/axios'
import { ToggleButton } from 'vue-js-toggle-button'
// @ts-ignore
import VueCookie from 'vue-cookie'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faTwitch } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// @ts-ignore
import VTooltip from 'v-tooltip'

library.add(faMoon, faTwitch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('ToggleButton', ToggleButton)
Vue.use(VueAxios)
Vue.use(VueCookie)
Vue.use(VTooltip)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
