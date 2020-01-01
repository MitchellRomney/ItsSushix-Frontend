import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueAxios from './plugins/axios'
import { ToggleButton } from 'vue-js-toggle-button'
// @ts-ignore
import VueCookie from 'vue-cookie'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faTwitch } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faTwitch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('ToggleButton', ToggleButton)
Vue.use(VueAxios)
Vue.use(VueCookie)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
