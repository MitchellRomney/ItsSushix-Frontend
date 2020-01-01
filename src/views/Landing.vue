<template>
  <div id="home">
    <div class="content-wrapper">
      <div class="leaderboard">
        <div class="leaderboard__header">
          <h1>Leaderboard</h1>
          <div class="leaderboard__toggle">
            <toggle-button v-model="metricLoyalty" :labels="{ checked: 'Loyalty', unchecked: 'Watch Time' }" :width="100"/>
          </div>
        </div>
        <div class="leaderboard__list">
          <transition-group name="list">
            <div class="leaderboard__item" v-for="(user, index) in leaderboard" :key="user.id">
              <span>#{{ index + 1 }}</span>
              <span>{{ user.displayName }}</span>
              <div class="leaderboard__value">
          <span v-if="metricLoyalty">
            {{ user.loyaltyPoints }}
          </span>
                <span v-else>
            {{ user.minutesWatched }}
          </span>
                {{ metric }}
              </div>
            </div>
          </transition-group>
        </div>
      </div>
      <div class="stats">
        <div class="stats__panel">
          <h2 class="stats__header">Statistics</h2>
          <div class="stats__category">
            <div class="stats__sub-header">Meepalytics</div>
              <div class="stats__stat">
                <span class="stats__stat-label">Meep Count</span>
                <span class="stats__stat-value" v-if="statistics">{{ this.statistics.meepCount }}</span>
              </div>
          </div>
          <div class="stats__category">
            <div class="stats__sub-header">Channel</div>
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
        <div class="stats__buttons">
          <router-link to="login">
            <button class="btn btn--blue">
              Login
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {query_getLeaderboard, query_getStatistics} from "@/queries"

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
    min-height: 100vh;
    width: 100vw;

    .content-wrapper {
      display: grid;
      grid-gap: 20px;
      grid-template: auto / 2fr 1fr;
      padding: 50px 20%;

      .leaderboard {
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: $alabaster;
        border-radius: 2px;
        border: 1px solid $athens-gray;

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
          padding: 20px;

          .leaderboard__item {
            display: grid;
            grid-template: auto / .5fr 1fr .5fr;
          }
        }
      }

      .stats {
        text-align: left;
        display: flex;
        flex-direction: column;

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

        .stats__buttons {
          margin-top: 10px;
          display: grid;
          grid-template: auto / 1fr 1fr;

          button {
            width: 100%;
          }
        }
      }
    }
  }
</style>
