import Vue from "vue";
import router from "@/router";
import store from '@/store/index'
import Axios from "axios";
import {Module, VuexModule, Mutation, Action, getModule} from 'vuex-module-decorators'
import {AuthModule} from "@/store/modules/auth"


@Module({store: store, namespaced: true, name: 'platform', dynamic: true})
class Platform extends VuexModule {
  public loaded: Boolean = false

  @Mutation
  private SET_PLATFORM_LOADED(value: Boolean) {
    this.loaded = value
  }

  @Action
  public setPlatform() {
    Axios({
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

      AuthModule.initializeUser({user: user, profile: profile, summoners: summoners})

      this.SET_PLATFORM_LOADED(true)
      if (router.currentRoute.query.nextUrl) {
        router.push(router.currentRoute.query.nextUrl as string)
      } else {
        router.push({ name: 'Home' })
      }
    });
  }
}

export const PlatformModule = getModule(Platform)