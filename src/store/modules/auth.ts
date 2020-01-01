import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators"
import {ProfileType, UserType} from "@/types"
import {mutation_refreshToken, mutation_twitchLogin} from "@/queries"
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
    PlatformModule.resetState()
    this.user = null
    this.profile = null
  }

  @Action
  public twitchLogin(payload: any) {
    if (payload.username && payload.email && payload.twitchId) {
      Axios({
        url: process.env.VUE_APP_API_URL + '/graphql',
        method: "post",
        data: {
          query: mutation_twitchLogin,
          variables: {
            twitchUsername: payload.username,
            email: payload.email,
            twitchId: payload.twitchId
          },
        }
      }).then((response) => {
        if (response.data.data.twitchLogin !== null) {

          // Get the user information from the response and set the userId in cookies.
          let data = response.data.data.twitchLogin

          Vue.prototype.$cookie.set('userId', data.user.id);

          // Get the JWT token and set it in the Cookies to keep session.
          Vue.prototype.$cookie.set('token', data.user.token);

          // Redirect to home.
          router.push({ name: 'Home' });
        }
      })
    }
  }

  @Action
  public logout() {
    Vue.prototype.$cookie.delete('token')
    Vue.prototype.$cookie.delete('userId')
    Vue.prototype.$cookie.delete('twitch_access_token')
    router.push({ name: 'Home' })
    this.RESET_STATE()
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