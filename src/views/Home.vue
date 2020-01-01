<template>
  <div id="home">
    <div class="user-panel">
      <div class="user-panel__header">
        <div class="user-panel__avatar">
          <img :alt="twitchUser.displayName" class="responsive" :src="twitchUser.profileImageUrl"/>
        </div>
        <h1>
          Welcome, {{ twitchUser.displayName }}
        </h1>
      </div>
      <form @submit.prevent="setUserLoyalty()" class="loyalty-migration" v-if="user.isSuperuser">
        <label for="user-dump">User Dump</label>
        <textarea id="user-dump" v-model="userDump"/>
        <input type="submit"/>
      </form>
      <button class="btn btn--blue" @click="logout()">
        Log Out
      </button>
    </div>
  </div>
</template>

<script>
    import {AuthModule} from "../store/modules/auth";
    import Axios from "axios";
    import {mutation_setUserLoyalty} from "../queries";

    export default {
        name: "Home",
        data() {
            return {
                userDump: '',
            }
        },
        computed: {
            user() {
                return AuthModule.user
            },
            twitchUser() {
                return AuthModule.profile.twitchUser
            }
        },
        methods: {
            setUserLoyalty() {
                let results = this.userDump.split(/[\s\n]+/)
                let payload = {}
                results.forEach((result, index) => {
                    if ((index + 1) % 3 === 0) {
                        payload[results[index - 2].replace(/[\n\r]/g, '').replace(' ', '')] = {
                            points: parseInt(results[index - 1]),
                            minutes: Math.round(parseFloat(result) * 60)
                        }
                    }
                })
                Axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: "post",
                    data: {
                        query: mutation_setUserLoyalty,
                        variables: {
                            payload: JSON.stringify(payload)
                        },
                    }
                })
            },
            logout() {
                AuthModule.logout()
            }
        }
    }
</script>

<style lang="scss" scoped>
  #home {
    display: flex;
    flex-direction: column;
    text-align: center;
    position: relative;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    .user-panel {
      padding: 20px;
      display: flex;
      flex-direction: column;
      background-color: $alabaster;
      border-radius: 2px;
      border: 1px solid $athens-gray;
      width: 50%;
      min-height: 30vh;

      .user-panel__header {
        display: flex;
        align-items: center;

        .user-panel__avatar {
          margin-right: 20px;
          height: 100px;
          width: 100px;
          border-radius: 5px;
          overflow: hidden;
        }
      }

      .loyalty-migration {
        display: flex;
        flex-direction: column;
        margin: 20px auto;
        width: 200px;
      }
    }
  }
</style>