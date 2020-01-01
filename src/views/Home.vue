<template>
  <div id="home">
    <div class="content-wrapper">
      <div class="leaderboard">
        <div class="leaderboard__header">
          <h1>Leaderboard</h1>
          <div class="leaderboard__toggle">
            <toggle-button v-model="metricLoyalty" :labels="{ checked: 'Loyalty', unchecked: 'Watch Time' }"
                           :width="100"/>
          </div>
        </div>
        <div class="leaderboard__list">
          <div class="leaderboard__column-headers">
            <div>
              Position
            </div>
            <div>
              User
            </div>
            <div>
              {{ metric }}
            </div>
          </div>
          <transition-group name="list">
            <router-link :to="{ name: 'Profile', params: { username: user.displayName }}" v-for="(user, index) in leaderboard"
                         :key="user.id">
              <div class="leaderboard__item">
                <span>#{{ index + 1 }}</span>
                <div class="leaderboard__item-user">
                  <div class="leaderboard__item-avatar" v-if="user">
                    <img :alt="user.displayName" class="responsive" :src="user.profileImageUrl"/>
                  </div>
                  {{ user.displayName }}
                </div>
                <div class="leaderboard__value">
              <span>
                {{ metricLoyalty ? user.loyaltyPoints : user.minutesWatched }}
              </span>
                </div>
              </div>
            </router-link>
          </transition-group>
        </div>
      </div>
      <div class="stats">
        <div class="user-panel">
          <div class="user-panel__header">
            <div class="user-panel__avatar" v-if="twitchUser">
              <img :alt="twitchUser.displayName" class="responsive" :src="twitchUser.profileImageUrl"/>
            </div>
            <h3 v-if="twitchUser">
              Welcome, {{ twitchUser.displayName }}
            </h3>
            <h3 v-else>
              Log in to see more!
            </h3>
          </div>
          <div class="user-panel__stats" v-if="twitchUser">
            <div class="user-panel__stats-header">
              Stream Statistics
            </div>
            <div class="user-panel__stat">
              <div class="user-panel__stat-label">
                Sushi Rolls:
              </div>
              <div class="user-panel__stat-value">
                {{ twitchUser.loyaltyPoints }}
              </div>
            </div>
            <div class="user-panel__stat">
              <div class="user-panel__stat-label">
                Minutes Watched:
              </div>
              <div class="user-panel__stat-value">
                {{ twitchUser.minutesWatched }}
              </div>
            </div>
            <div class="user-panel__stat">
              <div class="user-panel__stat-label">
                Total Messages:
              </div>
              <div class="user-panel__stat-value">
                {{ twitchUser.messagesCount }}
              </div>
            </div>
          </div>
          <div class="user-panel__stats" v-if="twitchUser">
            <div class="user-panel__stats-header">
              My Channel Statistics
            </div>
            <div class="user-panel__stat">
              <div class="user-panel__stat-label">
                View Count:
              </div>
              <div class="user-panel__stat-value">
                {{ twitchUser.viewCount }}
              </div>
            </div>
            <div class="user-panel__stat">
              <div class="user-panel__stat-label">
                Follower Count:
              </div>
              <div class="user-panel__stat-value">
                0
              </div>
            </div>
            <div class="user-panel__stat">
              <div class="user-panel__stat-label">
                Subscriber Count:
              </div>
              <div class="user-panel__stat-value">
                0
              </div>
            </div>
          </div>
          <button class="user-panel__auth btn btn--blue" @click="logout()" v-if="user">
            Log Out
          </button>
          <button class="user-panel__auth btn btn--blue" @click="login()" v-else>
            Login
          </button>
        </div>
        <div class="stats__panel">
          <h2 class="stats__header">Global Statistics</h2>
          <div class="stats__category">
            <div class="stats__sub-header">Meepalytics</div>
            <div class="stats__stat">
              <span class="stats__stat-label">Meep Count</span>
              <span class="stats__stat-value" v-if="statistics">{{ this.statistics.meepCount }}</span>
            </div>
          </div>
          <div class="stats__category">
            <div class="stats__sub-header">Sushilytics</div>
            <div class="stats__stat">
              <span class="stats__stat-label">Messages Count</span>
              <span class="stats__stat-value" v-if="statistics">{{ this.statistics.messagesCount }}</span>
            </div>
            <div class="stats__stat">
              <span class="stats__stat-label">Subscriber Count</span>
              <span class="stats__stat-value" v-if="statistics">{{ this.statistics.subscriberCount }}</span>
            </div>
            <div class="stats__stat">
              <span class="stats__stat-label">Follower Count</span>
              <span class="stats__stat-value" v-if="statistics">{{ this.statistics.followerCount }}</span>
            </div>
            <div class="stats__stat">
              <span class="stats__stat-label">View Count</span>
              <span class="stats__stat-value" v-if="statistics">{{ this.statistics.viewCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {query_getLeaderboard, query_getStatistics} from "@/queries"
    import {AuthModule} from "@/store/modules/auth";

    export default {
        name: 'landing',
        data() {
            return {
                leaderboard: [],
                metricLoyalty: true,
                statistics: null
            }
        },
        watch: {
            metricLoyalty() {
                this.getLeaderboard()
            }
        },
        computed: {
            metric() {
                return this.metricLoyalty ? 'Sushi Rolls' : 'Minutes'
            },
            user() {
                return AuthModule.user
            },
            twitchUser() {
                if (AuthModule.profile) {
                    return AuthModule.profile.twitchUser
                } else {
                    return null
                }
            }
        },
        methods: {
            getLeaderboard() {
                const metric = this.metricLoyalty ? 'loyalty_points' : 'minutes_watched'

                this.$http({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'POST',
                    data: {
                        query: query_getLeaderboard,
                        variables: {
                            metric: metric
                        }
                    }
                }).then((response) => {
                    this.leaderboard = response.data.data.leaderboard
                })
            },
            getMeeps() {
                this.$http({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'POST',
                    data: {
                        query: query_getStatistics
                    }
                }).then((response) => {
                    this.statistics = response.data.data.statistics
                })
            },
            login() {
                this.$router.push({name: 'Login'})
            },
            logout() {
                AuthModule.logout()
            }
        },
        mounted() {
            this.getLeaderboard()
            this.getMeeps()
        }
    }
</script>

<style lang="scss">
  #home {
    background-color: $wild-sand;
    width: 100vw;

    .content-wrapper {
      display: grid;
      grid-gap: 20px;
      grid-template: auto / 2fr 1fr;
      padding: 50px 10%;
      min-height: calc(100vh - 100px);

      .leaderboard {
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: $alabaster;
        border-radius: 2px;
        border: 1px solid $athens-gray;
        overflow-y: scroll;

        .leaderboard__header {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 20px 0;

          .leaderboard__toggle {
            position: absolute;
            right: 30px;
            top: 30px;
          }
        }

        .leaderboard__list {
          .leaderboard__column-headers {
            font-weight: bold;
            font-size: 0.8rem;
            opacity: 0.9;
            text-transform: uppercase;
            border-bottom: 1px solid $athens-gray;
            padding: 10px;
            display: grid;
            grid-template: auto / .5fr 1fr .5fr;
            margin-top: 10px;
          }

          .leaderboard__item {
            display: grid;
            grid-template: auto / .5fr 1fr .5fr;
            align-items: center;
            padding: 10px 0;
            cursor: pointer;
            transition: font-weight 0.25s ease;

            &:hover {
              font-weight: bold;
            }

            .leaderboard__item-user {
              display: flex;
              align-items: center;

              .leaderboard__item-avatar {
                height: 30px;
                width: 30px;
                overflow: hidden;
                border-radius: 5px;
                margin: auto 20px auto 0;
              }
            }
          }
        }
      }

      .stats {
        text-align: left;
        display: flex;
        flex-direction: column;

        .user-panel {
          padding: 20px;
          display: flex;
          flex-direction: column;
          background-color: $alabaster;
          border-radius: 2px;
          border: 1px solid $athens-gray;
          margin-bottom: 20px;

          .user-panel__stats {
            margin-top: 20px;
            display: flex;
            flex-direction: column;

            .user-panel__stats-header {
              font-weight: bold;
              font-size: 0.8rem;
              opacity: 0.9;
              text-transform: uppercase;
              margin-top: 10px;
            }

            .user-panel__stat {
              display: grid;
              grid-template: auto / 2fr 1fr;

              .user-panel__stat-label {
                font-weight: bold;
              }

              .user-panel__stat-value {
                align-self: end;
                text-align: right;
              }
            }
          }

          .user-panel__auth {
            margin-top: 20px;
          }

          .user-panel__header {
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;

            .user-panel__avatar {
              margin-right: 20px;
              height: 100px;
              width: 100px;
              border-radius: 5px;
              border: 1px solid $athens-gray;
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

        .stats__panel {
          padding: 20px;
          display: flex;
          flex-direction: column;
          background-color: $alabaster;
          border-radius: 2px;
          border: 1px solid $athens-gray;

          .stats__header {
            text-align: center;
          }

          .stats__category {
            margin-top: 10px;

            .stats__sub-header {
              font-weight: bold;
              font-size: 0.8rem;
              opacity: 0.9;
              text-transform: uppercase;
              margin-top: 10px;
            }

            .stats__stat {
              display: grid;
              grid-template: auto / 2fr 1fr;

              .stats__stat-label {
                font-weight: bold;
              }

              .stats__stat-value {
                align-self: end;
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
</style>
