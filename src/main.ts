import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueAxios from './plugins/axios'
import { ToggleButton } from 'vue-js-toggle-button'


Vue.component('ToggleButton', ToggleButton)
Vue.use(VueAxios)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
