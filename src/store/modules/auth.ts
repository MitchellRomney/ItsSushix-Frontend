import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators"
import {ProfileType, UserType} from "@/types"
import {mutation_login, mutation_refreshToken} from "@/queries"
import store from "@/store"
import Axios from "axios"
import Vue from "vue"
import router from "@/router"
import {PlatformModule} from "@/store/modules/platform"


@Module({store: store, namespaced: true, name: 'auth', dynamic: true})
class Auth extends VuexModule {
  public user: UserType | null = null
  public profile: ProfileType | null = null

  @Mutation
  private SET_USER(user: UserType) {
    this.user = user
  }

  @Mutation
  private SET_PROFILE(profile: ProfileType) {
    this.profile = profile
  }

  @Mutation
  private RESET_STATE(){
    this.user = null
    this.profile = null
    PlatformModule.loaded = false
  }

  @Action
  public login(payload: any) {
    if (payload.username && payload.password) {
      Axios({
        url: process.env.VUE_APP_API_URL + '/graphql',
        method: "post",
        data: {
          query: mutation_login,
          variables: {
            username: payload.username,
            password: payload.password
          },
        }
      }).then((response) => {
        if (response.data.data.login !== null) {

          // Get the user information from the response and set the userId in cookies.
          let data = response.data.data.login;

          Vue.prototype.$cookie.set('userId', data.user.id);

          // Get the JWT token and set it in the Cookies to keep session.
          Vue.prototype.$cookie.set('token', data.user.token);

          // Redirect to home.
          router.push({name: 'home'});
        }
      })
    }
  }

  @Action
  public logout() {
    Vue.prototype.$cookie.delete('token')
    Vue.prototype.$cookie.delete('userId')
    this.RESET_STATE()
    router.push('/')
  }

  @Action({rawError: true})
  public initializeUser(payload: any) {
    this.SET_USER(payload.user)
    this.SET_PROFILE(payload.profile)
  }

  @Action
  public refreshToken() {
    Axios({
      method: 'POST',
      data: {
        query: mutation_refreshToken,
        variables: {
          token: Vue.prototype.$cookie.get('token')
        },
      }
    }).then((response: any) => {
      const data = response.data.data.refreshToken
      Vue.prototype.$cookie.set('token', data.token)
    });
  }
}

export const AuthModule = getModule(Auth)