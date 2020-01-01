import axios from 'axios'
import {VueConstructor} from "vue";

const base = axios.create({
  baseURL: process.env.VUE_APP_API_URL + '/graphql',
  method: 'post'
})

export default {
  install(Vue: VueConstructor) {
    Vue.prototype.$http = base
  }
}