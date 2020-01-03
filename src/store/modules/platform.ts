import Vue from "vue";
import router from "@/router";
import store from '@/store/index'
import {Module, VuexModule, Mutation, Action, getModule} from 'vuex-module-decorators'
import {AuthModule} from "@/store/modules/auth"
import {query_userPlatformLoad} from "@/queries";
import {getDarkMode} from "@/utils/platform";


@Module({store: store, namespaced: true, name: 'platform', dynamic: true})
class Platform extends VuexModule {
  public loaded: Boolean = false
  public darkMode: Boolean = getDarkMode() || false
  public packageVersion: String = process.env.PACKAGE_VERSION || '0'

  @Mutation
  private SET_PLATFORM_LOADED(value: Boolean) {
    this.loaded = value
  }

  @Mutation
  private SET_DARKMODE(value: Boolean) {
    this.darkMode = value
  }

  @Action
  resetState() {
    this.SET_PLATFORM_LOADED(false)
  }

  @Action
  public toggleDarkMode() {
    const colorScheme = !this.darkMode ? 'dark' : 'light'
    Vue.prototype.$cookie.set('colorScheme', colorScheme)
    this.SET_DARKMODE(!this.darkMode)
  }

  @Action
  public loadPlatform() {
    Vue.prototype.$http({
      method: 'POST',
      data: {
        query: query_userPlatformLoad,
        variables: {
          userId: Vue.prototype.$cookie.get('userId')
        },
      }
    }).then((response: any) => {
      const user = response.data.data.user
      const profile = response.data.data.profile

      AuthModule.initializeUser({user: user, profile: profile})

      this.SET_PLATFORM_LOADED(true)

      if (router.currentRoute.query.nextUrl) {
        router.push(router.currentRoute.query.nextUrl as string)
      } else {
        router.push({ name: 'Home' })
      }
    })
  }
}

export const PlatformModule = getModule(Platform)