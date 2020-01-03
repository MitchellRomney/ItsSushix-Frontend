<template>
  <div id="user-panel">
    <div class="user-panel__header">
      <h2>User Profile</h2>
      <button class="btn btn--blue" @click="logout()" v-if="user">
        Log Out
      </button>
    </div>
    <div class="user-panel__panel">
      <div class="user-panel__user">
        <div class="user-panel__avatar">
          <img :alt="twitchUser.displayName" class="responsive" :src="twitchUser.profileImageUrl"/>
        </div>
        <div>
          Welcome,<br>
          <div class="user-panel__user-name" :style="{color: twitchUser.color}">
            {{ twitchUser.displayName }}
          </div>
        </div>
      </div>
      <StatsList title="Stream Statistics" :stats="streamStatistics"/>
      <StatsList title="My Channel Statistics" :stats="myChannelStatistics"/>
      <StatsList title="Global Statistics" :stats="globalStatistics"/>
    </div>
  </div>
</template>

<script>
    import {AuthModule} from "../../store/modules/auth"
    import StatsList from "@/components/StatsList";
    import {query_getStatistics} from "@/queries";

    export default {
        name: "UserPanel",
        components: {
          StatsList
        },
        props: {
            twitchUser: {
                type: Object,
                required: true
            }
        },
        data() {
          return {
              platformStatistics: null,
          }
        },
        computed: {
            user() {
                return AuthModule.user
            },
            streamStatistics() {
                return {
                    'Sushi Rolls': this.twitchUser.loyaltyPoints,
                    'Minutes Watched': this.twitchUser.minutesWatched,
                    'Total Messages': this.twitchUser.messagesCount
                }
            },
            myChannelStatistics() {
                return {
                    'View Count': this.twitchUser.viewCount,
                    'Follower Count': this.twitchUser.followerCount,
                    'Subscriber Count': this.twitchUser.subscriberCount
                }
            },
            globalStatistics() {
                return this.platformStatistics ? {
                    'Total Meeps': this.platformStatistics.meepCount,
                    'Total Messages': this.platformStatistics.messagesCount
                } : null
            }
        },
        methods: {
            logout() {
                AuthModule.logout()
            },
            getStatistics() {
                this.$http({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'POST',
                    data: {
                        query: query_getStatistics
                    }
                }).then((response) => {
                    this.platformStatistics = response.data.data.statistics
                })
            },
        },
        mounted() {
            this.getStatistics()
        }
    }
</script>

<style lang="scss" scoped>
  #user-panel {
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    margin-bottom: 20px;

    .user-panel__header {
      position: relative;
      display: flex;
      align-items: center;
      text-align: left;
      font-weight: bold;
      font-size: 0.8rem;
      opacity: 0.9;
      text-transform: uppercase;
      height: 70px;

      button {
        margin-left: auto;
      }
    }

    .user-panel__panel {
      padding: 20px;
      border-radius: 2px;

      @include theme() {
        background-color: t($background);
        border: 1px solid t($border);
      }

      .user-panel__user {
        display: grid;
        grid-template: auto / 1fr 2fr;
        align-items: center;
        justify-items: center;
        text-align: center;
        font-size: 1.2rem;

        .user-panel__avatar {
          height: 100px;
          width: 100px;
          border-radius: 5px;
          overflow: hidden;

          @include theme() {
            border: 1px solid t($border);
          }
        }

        .user-panel__user-name {
          font-weight: bold;
        }
      }
    }
  }
</style>